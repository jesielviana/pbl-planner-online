function moveByKeyboardArrows (embla) {
  document.addEventListener('keydown', (event) => {
    const tecla = event.keyCode
    if (tecla === 37) {
      // seta pra ESQUERDA
      embla.scrollPrev()
    } else if (tecla === 39) {
      // seta pra DIREITA
      embla.scrollNext()
    }
  })
}

export const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
  prevBtn.addEventListener('click', embla.scrollPrev, false)
  nextBtn.addEventListener('click', embla.scrollNext, false)
  moveByKeyboardArrows(embla)
}

export const disablePrevNextBtns = (prevBtn, nextBtn, embla) => () => {
  if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled')
  else prevBtn.setAttribute('disabled', 'disabled')

  if (embla.canScrollNext()) nextBtn.removeAttribute('disabled')
  else nextBtn.setAttribute('disabled', 'disabled')
}
