/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */
import 'clipboard' // For the copy to clipboard plugin
import Prism from 'prismjs'
import Vue from 'vue'

// Include a theme:
import 'prismjs/themes/prism-tomorrow.css'

// Include language support: (optional)
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-ruby'

// Include the toolbar plugin: (optional)
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'

// Include the autolinker plugin: (optional)
import 'prismjs/plugins/autolinker/prism-autolinker'
import 'prismjs/plugins/autolinker/prism-autolinker.css'

// Include the line numbers plugin: (optional)
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Include the line highlight plugin: (optional)
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

// Include some other plugins: (optional)
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'
import 'prismjs/plugins/show-language/prism-show-language'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'

Vue.component('prism', {
  props: {
    lang: {
      type: String,
      default: 'js'
    }
  },
  mounted () {
    Prism.highlightAll()
  },
  template: '<div class="prism"><pre class="line-numbers" :class="`language-${lang}`"><code><slot></slot></code></pre></div>'
})
