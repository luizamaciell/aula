let colors = [
  'green',
  'blue',
  'yellow',
  'cyan',
  'orange',
  'brown',
  'red',
];

const boxArray = [];

for (let i=0 ; i<100 ; i++) {
  const box = document.createElement('div');
  box.classList.add('box');
  document.body.insertAdjacentElement('beforeend', box);
  boxArray[i] = {
    obj: box,
    cont: 0,
  }

  box.addEventListener('click', () => {
    boxArray.forEach(b => {

      if (b.obj != box) {
        b.cont++;
        if (b.cont >= colors.length) {
          b.cont = 0;
        }
  
        const color = colors[ b.cont ];
        b.obj.style = `background-color: ${ color }`;
      }
    });

  });
}