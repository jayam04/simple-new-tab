const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const content1 = document.getElementById('content1');
const content2 = document.getElementById('content2');
const mainHeading = document.getElementById('main-heading');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const generalSettings = function () {
  mainHeading.innerText = 'General Settings ✨';
  content1.classList.remove('hidden');
  content2.classList.add('hidden');
};

const extensionSettings = function () {
  mainHeading.innerText = 'Extension Settings ✨';
  content1.classList.add('hidden');
  content2.classList.remove('hidden');
};

btnsOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

link1.addEventListener('click', generalSettings);
link2.addEventListener('click', extensionSettings);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
