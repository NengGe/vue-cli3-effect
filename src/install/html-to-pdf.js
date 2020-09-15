// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {
    Vue.prototype.$getPdf = function({
      element
    }) {
      let title = this.htmlTitle || 'title'
      // const ele = document.querySelector('#app')
      html2Canvas(element, {
        allowTaint: true,
        scale: 1,
        dpi: 300,
        width: 1519,
        // height: element.clientHeight,
        background: '#fff'
        // dpi: '192'
      }).then(function(canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        console.log(pageHeight)
        // let img = document.createElement('img')
        // // console.log(leftHeight)
        // img.src = pageData
        // img.setAttribute('width', '100%')
        document.body.appendChild(canvas)
        let PDF = new JsPDF('', 'pt', 'a4')
        console.log(leftHeight)
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      }
      )
    }
  }
}
