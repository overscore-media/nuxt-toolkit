/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable require-await */
/* eslint-disable no-unused-vars */

////////////////////////////////// IMPORTS //////////////////////////////////
import { DateTime } from 'luxon'

// NodeJS Built-in Modules
const fs = require("fs")
const path = require("path")
const beautify = require("js-beautify").js

// Markdown-It Plugins and other JS
const customBlockPlugin = require("markdown-it-custom-block")
const emojiPlugin = require("markdown-it-emoji")
const katexPlugin = require("@abreto/markdown-it-katex")
const linkPlugin = require("markdown-it-link-attributes")
const htmlMinifier = require("html-minifier-terser").minify
const matter = require("gray-matter")
const twemoji = require("twemoji/dist/twemoji.npm")

///////////////////////// Markdown-It Initialization ////////////////////////

const markdownit = require("markdown-it")({
  linkify: true,
  html: true,
  typographer: true
})
  .use(katexPlugin)
  .use(emojiPlugin)
  .use(linkPlugin, [
    {
      pattern: /^https?:\/\//,
      attrs: {
        class: "external-link",
        target: "_blank",
        rel: "noopener noreferrer"
      }
    },
    {
      pattern: /^\//,
      attrs: {
        class: "absolute-link"
      }
    }
  ])
  .use(customBlockPlugin, {
    youtube(url) {
      const youTubeIframe = `<div class="youtube-video">
                <iframe
                  src="https://www.youtube.com/embed/${url}?origin=https://botinabox.cas&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                  allowfullscreen
                  allowtransparency
                  allow="autoplay"
                ></iframe>
              </div>`
      return youTubeIframe
    }
  })

markdownit.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content)
}

/// ///////////////////////// Helper Functions /////////////////////////////

function renderMarkdown(md) {
  const content = matter(md).content
  return markdownit.render(content)
}

function minifyHTML(html) {
  return htmlMinifier(html, {
    removeAttributeQuotes: false,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  })
}

function subFolderExists(dirName, subFolder) {
  return fs.existsSync(`${dirName}${subFolder}`)
}

function makeSubFolder(dirName, subFolder) {
  fs.mkdirSync(`${dirName}${subFolder}`)
}

function pathIsADirectory(dirName, fileName) {
  return fs.lstatSync(`${dirName}${fileName}`).isDirectory()
}

function getContent(dirName, fileName) {
  return fs.readFileSync(`${dirName}${fileName}`, "utf-8")
}

//////////////////////////// Markdown Functions /////////////////////////////

function parseMarkdown(dirName, frontMatterShouldBeParsed) {
  fs.readdir(dirName, (err, files) => {
    if (err) {
      throw err
    } else {
      files.forEach((fileName) => {
        if (!pathIsADirectory(dirName, fileName)) {
          const fileContent = getContent(dirName, fileName)
          fileGenerator(
            dirName,
            fileName,
            fileContent,
            frontMatterShouldBeParsed
          )
        }
      })
    }
  })
}

function fileGenerator(
  dirName,
  filename,
  content,
  frontMatterShouldBeParsed = false
) {
  const renderedMarkdown = renderMarkdown(content)

  let frontMatter = matter(content).data
  frontMatter.url = `${path.basename(filename, ".md")}`

  if (frontMatter.date) {
    frontMatter.date = DateTime.fromMillis(Date.parse(frontMatter.date)).toFormat('DDD')
  }

  frontMatter = beautify(JSON.stringify(frontMatter))

  if (!subFolderExists(dirName, "compiled")) {
    makeSubFolder(dirName, "compiled")
  }

  if (frontMatterShouldBeParsed && !subFolderExists(dirName, "data")) {
    makeSubFolder(dirName, "data")
  }

  if (subFolderExists(dirName, "compiled")) {
    fs.writeFileSync(
      `${dirName}compiled/${path.basename(filename, ".md")}.html`,
      renderedMarkdown
    )
  }

  if (frontMatterShouldBeParsed) {
    fs.writeFileSync(
      `${dirName}data/${path.basename(filename, ".md")}.json`,
      frontMatter
    )
  }
}

function compileMarkdown(directory, frontMatterShouldBeParsed = false) {
  const dirName = `${process.cwd()}/${directory}/`
  parseMarkdown(dirName, frontMatterShouldBeParsed)
}

// For running with yarn md or npm run md (without the other generate shenanigans)
if (!this.nuxt) {
  compileMarkdown("blog", true)
}

export default function markdownModule() {
  this.nuxt.hook("generate:before", async () => {
    compileMarkdown("blog", true)
  })
}
