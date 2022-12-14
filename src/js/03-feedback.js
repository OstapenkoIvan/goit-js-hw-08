import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

let formData = {};

getSavedData();

formEl.addEventListener('input', throttle(saveInputLocalStorage, 500));
// formEl.addEventListener('input', saveInputLocalStorage);
formEl.addEventListener('submit', onFormSubmit);

function saveInputLocalStorage(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function getSavedData() {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (!savedData) {
    return;
  }

  if (savedData.email) {
    inputEl.value = savedData.email;
    formData.email = savedData.email;
  }
  if (savedData.message) {
    textareaEl.value = savedData.message;
    formData.message = savedData.message;
  }
  return;
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (inputEl.value === '' || textareaEl.value === '') {
    return alert('Enter info, dont leave empty fields');
  }

  console.log(formData);

  formEl.reset();
  localStorage.removeItem('feedback-form-state');
}
