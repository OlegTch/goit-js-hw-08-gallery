const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  list: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  backdrop: document.querySelector('div.lightbox__overlay'),
  btnClose: document.querySelector('.lightbox__button'),
  lightboxImage: document.querySelector('.lightbox__image'),
};

function createItem({ preview, original, description }, idx) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  const image = document.createElement('img');

  item.classList.add('gallery__item');
  link.classList.add('gallery__link');
  image.classList.add('gallery__image');
  image.setAttribute('data-index', idx);

  link.href = original;
  image.src = preview;
  image.alt = description;
  image.dataset.source = original;
  //   image.dataset.index = idx;

  item.append(link);
  link.append(image);

  return item;
}

const createListGallary = galleryItems.map((galleryItem, idx) => {
  return createItem(galleryItem, `${idx + 1}`);
});

refs.list.append(...createListGallary);

refs.list.addEventListener('click', event => {
  const isGalleryImage = event.target.classList.contains('gallery__image');
  event.preventDefault(); // отменяем переход по ссылке

  if (!isGalleryImage) {
    console.log('клик мимо картинки');
    return;
  }

  onOpenModal();
});

function onOpenModal() {
  refs.lightboxImage.src = event.target.dataset.source;
  refs.lightboxImage.alt = event.target.alt;
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onLeftPress);
  window.addEventListener('keydown', onRigthPress);
  refs.lightbox.classList.add('is-open');
  refs.btnClose.addEventListener('click', onBtnClosePress);
  refs.backdrop.addEventListener('click', onBackdropClick);
}

function onCloseModal() {
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onLeftPress);
  window.removeEventListener('keydown', onRigthPress);
  refs.lightbox.classList.remove('is-open');
  refs.btnClose.removeEventListener('click', onBtnClosePress); // отключать не обязательно
  refs.backdrop.removeEventListener('click', onBackdropClick); // отключать не обязательно
}

function onBtnClosePress() {
  onCloseModal();
}

function onBackdropClick(event) {
  //   console.log(event.currentTarget);
  //   console.log(event.target);
  if (event.currentTarget === event.target) {
    console.log('Клик по backdrop');
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  //   console.log(event.code);
  const ESC_KEY_CODE = 'Escape';

  if (event.code === ESC_KEY_CODE) {
    refs.lightbox.classList.remove('is-open');
    onCloseModal();
  }
}

function onLeftPress(event) {
  const LEFT_KEY_CODE = 'ArrowLeft';
  if (event.code === LEFT_KEY_CODE) {
    console.log('Прокрутка влево');
    privImg();
  }
}

function onRigthPress(event) {
  const RIGHT_KEY_CODE = 'ArrowRight';
  if (event.code === RIGHT_KEY_CODE) {
    console.log('Прокрутка вправо');
    nextImg();
  }
}

function findIndexImageInObject(src) {
  return galleryItems.indexOf(
    galleryItems.find(element => element.original === src),
  );
}

function privImg() {
  let currentImageIndex = findIndexImageInObject(
    refs.lightboxImage.getAttribute('src'),
  );
  if (currentImageIndex == 0) {
    currentImageIndex = galleryItems.length;
    // console.log('Переход с первой картинки на последнюю');
  }
  refs.lightboxImage.src = galleryItems[currentImageIndex - 1].original;
  refs.lightboxImage.alt = galleryItems[currentImageIndex - 1].description;
}

function nextImg() {
  let currentImageIndex = findIndexImageInObject(
    refs.lightboxImage.getAttribute('src'),
  );
  if (currentImageIndex === galleryItems.length - 1) {
    currentImageIndex = -1;
    // console.log('Переход с последней картинки на первую');
  }
  refs.lightboxImage.src = galleryItems[currentImageIndex + 1].original;
  refs.lightboxImage.alt = galleryItems[currentImageIndex + 1].description;
}
