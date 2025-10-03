let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const formFeedback = document.querySelector('.feedback-form');
const emailInput = formFeedback.elements.email;
const messageTextarea = formFeedback.elements.message;

emailInput.removeAttribute('required');
messageTextarea.removeAttribute('required');

function loadLocalStorage() {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState) {
      const state = JSON.parse(serializedState);

      formData = {
        email: state.email || '',
        message: state.message || '',
      };
      emailInput.value = formData.email;
      messageTextarea.value = formData.message;
    }
  } catch (error) {
    console.log(error.message);
  }
}
loadLocalStorage();

formFeedback.addEventListener('input', event => {
  if (event.target.name === 'email' || event.target.name === 'message') {
    formData[event.target.name] = event.target.value;
  }
  try {
    const serializedState = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.log(error.message);
  }
});

formFeedback.addEventListener('submit', event => {
  event.preventDefault();
  const currentEmail = emailInput.value.trim();
  const currentMessage = messageTextarea.value.trim();

  formData.email = currentEmail;
  formData.message = currentMessage;

  if (currentEmail === '' || currentMessage === '') {
    alert('Fill please all fields');
    return;
  }
  console.log('Form Data:', formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = {
    email: '',
    message: '',
  };

  formFeedback.reset();
});
