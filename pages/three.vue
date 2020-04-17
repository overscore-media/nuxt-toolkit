<template>
  <div class="three-page-wrapper">
    <div class="hero-wrapper">
      <v-btn
        bottom
        dark
        fab
        color="grey darken-3"
        class="scroll-down-button mx-2 text-center"
        @click="scrollDown"
      >
        <v-icon dark>
          {{ mdiChevronDownSVG }}
        </v-icon>
      </v-btn>
    </div>
    <v-layout class="white black--text three-page-content">
      <v-container>
        <h2>THREE.js and Nuxt</h2>
        <v-divider></v-divider>
        <h3>Chippy Model Donated by <a href="https://botinabox.ca" rel="noopener noreferrer">Bot-In-a-Box Educational Robotics</a></h3>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mdiChevronDown } from '@mdi/js'
import chippy from '~/assets/gltf/chippy.glb'

export default {
  data () {
    return {
      mdiChevronDownSVG: mdiChevronDown,
      // The WebGL render function
      renderer: null,
      // The 3D space
      scene: null,
      // The viewport for the renderer
      camera: null,
      // The GLTF of Chippy
      model: null,
      // The ability to orbit/rotate
      controls: null,
      canvasVisible: true
    }
  },
  mounted () {
    // Mounted hook; runs the THREE.js stuff
    if (process.browser) {
      if (document.querySelector('.three-page-content')) {
        this.$nextTick().then(() =>
          document.querySelector('.three-page-content').classList.add('under-hero')
        )
      }

      if (document.querySelectorAll('.hero-wrapper').length !== 1) {
        document
          .querySelector('.v-application--wrap')
          .removeChild(document.querySelectorAll('.hero-wrapper')[0])
      }
      if (document.getElementsByClassName('hero-canvas').length === 0) {
        this.init()
        this.animate()

        // This binds some JS event listeners to a few functions
        window.addEventListener('resize', this.resize, false)
        window.addEventListener('scroll', this.updateCanvasVisibility, false)
        window.addEventListener('blur', () => {
          this.canvasVisible = false // So clicking outside the window disables the animation
        })
        window.addEventListener('focus', () => {
          this.canvasVisible = true
        })
      }
    }
  },
  beforeDestroy () {
    if (this.model && this.controls && this.camera) {
      this.scene.remove(this.model)
      this.scene.remove(this.controls)
      this.scene.remove(this.camera)
    }
    this.clearScene(this.scene)
    /*     if (
      document.querySelector('.hero-wrapper') &&
      this.renderer &&
      this.renderer.domElement.parentNode ===
        document.querySelector('.hero-wrapper')
    ) {
      document
        .querySelector('.hero-wrapper')
        .removeChild(this.renderer.domElement)
      document
        .querySelector('.v-application--wrap')
        .removeChild(document.querySelector('.hero-wrapper'))
    } */
  },
  methods: {
    init () {
      // So no code runs on the server
      if (process.browser) {
        // Importing the libraries
        const {
          Scene,
          PointLight,
          PerspectiveCamera,
          WebGLRenderer,
          sRGBEncoding,
          PolarGridHelper,
          Box3
        } = require('three')
        const GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader')
          .GLTFLoader
        const OrbitControls = require('three/examples/jsm/controls/OrbitControls')
          .OrbitControls
        // const DRACOLoader = require('three/examples/jsm/loaders/DRACOLoader').DRACOLoader

        // const dracoLoader = new DRACOLoader()

        // So GLTF files can be loaded locally or from other sites
        const loader = new GLTFLoader()
        loader.crossOrigin = true

        // dracoLoader.setDecoderPath(
        //   '/draco/'
        // )

        // loader.setDRACOLoader(dracoLoader)

        // Initializing the scene
        this.scene = new Scene()

        // Adding two Point Lights to the scene
        const light1 = new PointLight(0xFFFFFF, 2)
        const light2 = new PointLight(0xFFFFFF, 2)
        const light3 = new PointLight(0xFFFFFF, 3)
        const light4 = new PointLight(0xFFFFFF, 3)
        light1.position.set(50, 50, 50)
        light2.position.set(50, 50, -50)
        light3.position.set(-50, 50, 0)
        light4.position.set(0, -50, 0)
        this.scene.add(light1, light2, light3, light4)

        // Setting up the camera
        this.camera = new PerspectiveCamera(
          75,
          window.innerWidths / window.innerHeight,
          0.1,
          100
        )

        // Setting up the renderer
        this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.outputEncoding = sRGBEncoding
        this.renderer.domElement.classList.add('hero-canvas')
        document
          .querySelector('.hero-wrapper')
          .appendChild(this.renderer.domElement)

        // Setting up the controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.autoRotate = true
        this.controls.enableZoom = false

        // Creating the grid and adding it to the scene
        const grid = new PolarGridHelper(20, 20, 15, 15, 0x2F2F2F, 0x2F2F2F)
        this.scene.add(grid)

        // Loading and adding the Chippy model to the scene
        loader.load(chippy, (gltf) => {
          // Setting the model to the GLTF file's Scene (3D object)
          this.model = gltf.scene

          // The right colour for Chippy's body is #C9C3B2

          // Some positioning shenanigans
          const boundingBox = new Box3().setFromObject(this.model)
          const boundingBoxSize = boundingBox.max.sub(boundingBox.min)
          const height = boundingBoxSize.y
          const width = boundingBoxSize.x
          this.model.position.y = -height / 2
          // Tiny tweak of the position of Chippy towards the center
          this.model.position.z += width / 6

          // Moving the grid to just under Chippy
          grid.position.y -= height / 2 + 0.01

          // Giving the model a referenceable name
          this.model.name = 'Chippy'

          // Finally adding the Chippy model to the scene
          this.scene.add(this.model)
        })

        this.camera.position.x = 4
        this.camera.position.y = -0.1
        this.camera.position.z = 3

        // Basically this.resize but that doesn't work here for some reason
        // Without this, the render only works on the first screen resize
        const canvas = this.renderer.domElement
        const pixelRatio = window.devicePixelRatio
        const width = (canvas.clientWidth * pixelRatio) | 0
        const height = (canvas.clientHeight * pixelRatio) | 0

        if (canvas.width !== width || canvas.height !== height) {
          this.renderer.setSize(width, height, false)
        }
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
      }
    },
    animate () {
      // Pretty self-explanatory, honestly; it's just keeping everything updated
      // It runs every frame (probably 60 FPS but it depends on the monitor/GPU/RAM/whatever)
      if (process.browser) {
        requestAnimationFrame(this.animate)
        if (this.canvasVisible) {
          this.controls.update()
        }
        this.renderer.render(this.scene, this.camera)
      }
    },
    resize () {
      // So everything shifts around if the screen changes size
      if (process.browser) {
        const canvas = this.renderer.domElement
        const pixelRatio = window.devicePixelRatio
        const width = (canvas.clientWidth * pixelRatio) | 0
        const height = (canvas.clientHeight * pixelRatio) | 0

        if (canvas.width !== width || canvas.height !== height) {
          this.renderer.setSize(width, height, false)
        }
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
      }
    },
    // For the scroll button to scroll past the top
    scrollDown () {
      if (process.browser) {
        window.scrollTo({
          top: window.innerHeight - 56,
          behavior: 'smooth'
        })
      }
      /* Without the button, it's possible someone could get stuck spinning Chippy
      and not be able to scroll! */
    },
    clearScene (scene) {
      if (scene) {
        for (let i = scene.children.length - 1; i >= 0; i--) {
          const object = scene.children[i]
          if (object.isMesh) {
            object.geometry.dispose()
            object.material.dispose()
          }
          scene.remove(object)
        }
      }
    },
    updateCanvasVisibility () {
      if (process.browser) {
        if (window.pageYOffset + 64 <= window.innerHeight) {
          this.canvasVisible = true
        } else {
          this.canvasVisible = false
        }
      }
    }
  },
  head () {
    return {
      title: 'THREE'
    }
  }

}
</script>

<style lang="scss">
// Helpful styles
.scroll-down-button {
  z-index: 2;
  position: absolute;
  top: calc(85vh - 56px);
  left: calc(50% - 28px);
}
.hero-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
}

.three-page-wrapper {
  overflow: hidden !important;
}

.hero-canvas {
  position: absolute !important;
  top: 0 !important;
  background: linear-gradient(
    180deg,
    rgba(47, 47, 47, 1) 0%,
    rgba(255, 255, 255, 1) 90%
  );
  z-index: 1;
  margin-bottom: 1px;
  &:focus {
    outline: none;
  }
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.v-content__wrap {
  position: absolute;
}

.under-hero {
  position: relative;
  margin: 0 !important;
}
</style>
