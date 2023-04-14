//adattare la risposta
function show(event){
    const h = x.querySelector('h1');
    h.textContent = RESULTS_MAP[event].title;
    const p = x.querySelector('p');
    p.textContent = RESULTS_MAP[event].contents;
}

//visualizzare la risposta
function finale(){
    let val = 1;
    let i = 0;
    let ind = 0;
    let j = 1;
    for (const c of cases) {
    c.removeEventListener('click', choise);
    }
    x.classList.remove('hidden');

    for(;i<2;i++){
        const ii = Object.values(list)[i];
        for(j = 1;j<=2;j++){
        const jj = Object.values(list)[j];
        if(ii == jj && i != j){
        val++;
        ind = i;
        }}}
    if(val == 1){
        const ok = Object.values(list)[0];
        show(ok);
    } else {
        const ok = Object.values(list)[ind];
        show(ok);
    }

}

//resettare il quiz
function reset(event){
    x.classList.add('hidden');
    for (const c of cases)
    {
    c.addEventListener('click', choise);
    c.style.opacity = 1;
    c.classList.remove("style");
    const vv = c.querySelector('img.checkbox');
    vv.src = 'images/unchecked.png';
    }
    delete list.one;
    delete list.two;
    delete list.three;  
}

//scegliere la risposta
function choise(event){
  const ck = event.currentTarget;
  const id = ck.dataset.choiceId;
  const od = ck.dataset.questionId;
  const p = ck.parentNode;
  const t = p.querySelectorAll('div');
  const v = ck.querySelector('img.checkbox');
  v.src = 'images/checked.png';
    list[od] = id;
    ck.classList.add("style");
    ck.style.opacity = 1;
    for( let i of t ){
        if( i != ck){
            i.style.opacity = 0.6;
            i.classList.remove("style");
            const vv = i.querySelector('img.checkbox');
            vv.src = 'images/unchecked.png';
        }
    }
    let y = Object.keys(list).length;
    if(y == '3'){   finale();   }
   } 
   
//main + fetch
function onResponse(response) {
    console.log(response.status);
}

fetch('constants.js').then(onResponse);

let list = {};
const cases = document.querySelectorAll('.choice-grid div');
const x = document.querySelector('#risposta');
for (const c of cases)
{
  c.addEventListener('click', choise);
}
const bot = document.querySelector('button');
bot.addEventListener('click', reset);