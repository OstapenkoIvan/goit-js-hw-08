// import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

let formData = {};

getSavedData();

// formEl.addEventListener('input', throttle(saveInputLocalStorage, 500));
formEl.addEventListener('input', saveInputLocalStorage);
formEl.addEventListener('submit', onFormSubmit);

function saveInputLocalStorage(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function getSavedData() {
  formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formData.email) {
    inputEl.value = formData.email;
  }
  if (formData.message) {
    textareaEl.value = formData.message;
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
