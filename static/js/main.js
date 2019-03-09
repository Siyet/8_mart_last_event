const PARS1 = [
  { key: 'par1', strs: [ `Идентификация вируса.^1000.^1000.^1000` ] },
  { key: 'img1', strs: [ FIRST_FOTO ] },
  { 
    key: 'par2', 
    strs: [
      `<span>Вирус идентифицирован.^800.^800.^800 </span><big style="color:yellow;"><b>SeregaNagibator666</b></big>^1000<br><span>Степень угрозы: </span><big style="color:red;">НАИВЫСШАЯ</big>^1000<br><span>Вирус помещен в карантин</span><br><span>Для удаления вируса введите 6 кодовых слов:</span>^2000`
    ], 
    func: () => {
      $('#par1').parent().hide('fast');
      sleep(9000).then(()=>$('.line').show('slow'))
    }
  }
]
const PARS2 = [
  { key: 'img2', strs: [ SECOND_FOTO ] },
  { key: 'par3', strs: [
    `<big>ПОЗДРАВЛЯЕМ!!!</big>`,
    `<big>Вирус <b style="color:yellow;">SeregaNagibator666</b> успешно удален!</big>`
  ], func: ()=> {
    $('img').css('opacity','1')
  }}
]
let valid_values = [
  "КИСЕЛЬ",
  "ОЧКИ",
  "ГРАЧИ",
  "КИРПИЧ",
  "КАРТОШКА",
  "УГАР"
]
let runPar = async (idx, pars) => {
  if (pars[idx].func) await pars[idx].func()
  let is_img = pars[idx].key.indexOf("img") !== -1
  let opts = {
    strings: pars[idx].strs
  }
  if (is_img) {
    opts.typeSpeed = 80
    opts.showCursor = false
  }else {
    opts.typeSpeed = 40
    opts.cursorChar = '_'
  }
  let next_idx = idx + 1
  if (next_idx < pars.length){
    opts.onComplete = () => runPar(next_idx, pars)
  } else {
    opts.onComplete = async () => {
      validDataAndSetInput()
    }
  }
  new Typed(`#${pars[idx].key}`, opts)
}
let validDataAndSetInput = (event=null) =>{
  if (event && event.keyCode != 13) return
  if (!event){
    $('#par2').next().css('display','none');
  } else {
    let target = $(event.target)
    let target_parent = target.parent()
    let founded_value_idx = valid_values.indexOf(target.val().toUpperCase())
    if (founded_value_idx !== -1){
      target_parent.append('<span class="green">&nbsp;✔</span>')
      valid_values.splice(founded_value_idx,1)
      target_parent.append('<br>')
      target.off('keydown', validDataAndSetInput)
      if (!valid_values.length){
        let button = $('<button>Удалить вирус</button>')
        target_parent.append(button)
        return button.click(()=>{
          $('#par1, #par2, #inputs').hide()
          $('#img1').parent().hide()
          runPar(0, PARS2)
        })
      }
    } else if (event) {
      let invalid = $('<small class="orange">&nbsp;введенное слово не верное, повторите ввод</small>')
      target_parent.append(invalid)
      target.val("")
      return sleep(3000).then(()=>{
        invalid.hide('fast')
        return sleep(800)
      }).then(()=>invalid.remove())
    }
  }
  
  let input = $('<input type="text"/>')
  $("#inputs").append(input)
  input.focus()
  input.on('keydown', validDataAndSetInput)
}

let sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(() => {
  runPar(0, PARS1)
  // new Typed("#head", {
  //   strings: [`Идентификация вируса...`],
  //   typeSpeed: 40,
  //   cursorChar: '_',
  //   onComplete: ()=>{
  //     new Typed("#first_foto", {
  //       strings: [FIRST_FOTO],
  //       typeSpeed: 0,
  //       showCursor:false,
  //       startDelay:1000,
  //       onComplete: ()=>{
  //         new Typed("#par3", {
  //           startDelay: 1000, 
  //           strings: [`<span>Вирус идентифицирован...</span>^1000`,`<span>Степень угрозы:</span><br><big>НАИВЫСШАЯ</big>^1000<br><span>Вирус идентифицирован как:</span><br><big><b>SeregaNagibator666</b></big>^1000<br><br><span>Вирус помещен в карантин</span><br><span>Для удаления вируса введите кодовые слова:</span>^2000`],
  //           typeSpeed: 40,
  //           cursorChar: '_',
  //           onComplete:()=>{
  //             new Typed("#par4", {
  //               strings: [SECOND_FOTO],
  //               typeSpeed: 0,
  //               showCursor:false,
  //               startDelay:1000,
  //               onComplete: ()=>{
  //                 new Typed("#par5", {
  //                   strings: [`<big>ПОЗДРАВЛЯЕМ!!!</big>`,`<big>Вирус <b>SeregaNagibator666</b> успешно удален!</big>`],
  //                   typeSpeed: 40,
  //                   cursorChar: '_'
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
})()

