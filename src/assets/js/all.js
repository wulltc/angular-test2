
let toggle_nav_xs = 0 ;

function _display_Nav_Xs()
{
  if(toggle_nav_xs == 0)
  {
    toggle_nav_xs = 1 ;
    document.getElementById('toggleNavBarXs').style.display = 'flex';
    let x = document.getElementById('toggleNavBarXs').querySelectorAll('button');
    x.forEach( element => {
        element.classList.remove('fadeOut');
        element.style.display = 'inline';
        element.classList.add('fadeIn');
    } );
  }
  else
  {
    toggle_nav_xs = 0 ;
    let x = document.getElementById('toggleNavBarXs').querySelectorAll('button');
    x.forEach( element => {
        element.classList.remove('fadeIn');
        element.classList.add('fadeOut');
    } );

    setTimeout(() => {
          document.getElementById('toggleNavBarXs').style.display = 'none';
         // document.querySelector('.daaa').style.marginBottom = '20px';
          //console.clear();
    }, 2000);
  }

}

function chooseNav(element)
{
  let x = document.querySelectorAll('.nav-btn');
  for(let i=0; i<x.length;i++)
  {
    x[i].classList.remove('hoverNavBtn')
  }
  element.classList.add('hoverNavBtn');
}

function chooseNav2(element)
{
  let x = document.querySelectorAll('.nav-item');
  for(let i=0; i<x.length;i++)
  {
    x[i].classList.remove('hoverNavBtn');
    x[i].querySelector('a').classList.remove('hoverNavBtn');
  }
  element.querySelector('a').classList.add('hoverNavBtn');
}

$(function(){


});

// Start MyDropdown Area

function doWhileScroll()
{
  console.log("Scrolling");
}

document.addEventListener('scroll',doWhileScroll)

function _showDropdown(element)
{
  let theI = element.querySelector('i');
  let state = theI.getAttribute('state');

  let elementState = element.getAttribute('state');

  if(state == "0")
  {
    theI.setAttribute('state','1');

    if(element.id == "secondDrop")
    {
       theI.classList.remove('rotateToLoad');
       theI.classList.add('rotateToUnloaded');
    }
    else
    {
      theI.classList.remove('rotateToLoadReverse');
      theI.classList.add('rotateToUnloadedReverse');
    }


  }
  else
  {
    theI.setAttribute('state','0');
    if(element.id == "secondDrop")
    {
      theI.classList.remove('rotateToUnloaded');
      theI.classList.add('rotateToLoad');
    }
    else
    {
      theI.classList.remove('rotateToUnloadedReverse');
      theI.classList.add('rotateToLoadReverse');
    }

  }

  if(elementState == "0")
  {
    element.setAttribute('state','1');
    //let allCryptoClone = document.querySelector('.allCryptos').cloneNode(true);
    if(element.id == "firstDrop")
    {
         document.getElementById('appendableFirst').querySelector('.Conf').style.display = "flex";
         document.getElementById('appendableFirst').querySelector('.Conf').style.opacity = "1";
      // allCryptoClone.classList.add('forFirstDrop');

      // let postionOption = element.getBoundingClientRect();

      // let supWidth = (element.clientWidth)/2;

      // allCryptoClone.classList.add('Conf');
      // allCryptoClone.style.display = 'flex';
      // allCryptoClone.style.top     = (postionOption.top-180)  +'px';
      // allCryptoClone.style.left    =  (postionOption.left+supWidth/2) +'px';
      // document.getElementById('appendable').appendChild(allCryptoClone);
    }
    else
    {
      document.getElementById('appendableSecond').querySelector('.Conf').style.display = "flex";
      document.getElementById('appendableSecond').querySelector('.Conf').style.opacity = "1";
      // allCryptoClone.classList.add('forSecondDrop');

      // let postionOption = element.getBoundingClientRect();

      // let supWidth = (element.clientWidth)/2;

      // allCryptoClone.classList.add('Conf');
      // allCryptoClone.style.display = 'flex';
      // allCryptoClone.style.top     = (postionOption.bottom)  +'px';
      // allCryptoClone.style.left    =  (postionOption.left+supWidth/2) +'px';
      // document.getElementById('appendable').appendChild(allCryptoClone);
    }

  }
  else
  {
    element.setAttribute('state','0');
    if(element.id == "firstDrop")
    {
      document.getElementById('appendableFirst').querySelector('.Conf').style.display = "none";
      document.getElementById('appendableFirst').querySelector('.Conf').style.opacity = "0";
     // document.querySelector('.forFirstDrop').remove();
    }
    else
    {
      document.getElementById('appendableSecond').querySelector('.Conf').style.display = "none";
      document.getElementById('appendableSecond').querySelector('.Conf').style.opacity = "0";
      //document.querySelector('.forSecondDrop').remove();
    }
  }
}

// End MyDropdown Area


