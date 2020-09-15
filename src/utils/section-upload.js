export function uploadFile(file) {
  var chunkSize = 1024 * 1024 //每片1M大小
  var totalSize = file.size
  var chunkQuantity = Math.ceil(totalSize / chunkSize) //分片总数
  var offset = 0 //偏移量

  var reader = new FileReader()
  reader.onload = function(e) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.overrideMineType('application/octet-stream')

    xhr.onreadstatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        ++offset
        if (offset === chunkQuantity) {
          xhr = null
          alert('上传完成')
        } else if (offset === chunckQuantity - 1) {
          blob = file.slice(offset * chunkSize, totalSize)
          reader.readAsBinaryString(blob)
        } else {
          blob = file.slice(offset * chunkSize, (offset + 1) * chunckSize)
          reader.readAsBinaryString(blob)
        }
      } else {
        alert('上传出错')
      }
    }

    if (xhr.sendAsBinary) {
      xhr.sendAsBinary(e.target.result)
    } else {
      xhr.send(e.target.result)
    }
  }
  var blob = file.slice(0, chunkSize)
  reader.readAsBinaryString(blob)
}
