import './getPositionOf';

(function main(textLength) {
  const $fakeTextElement = document.getElementById('fake-text');
  const $fragmentElement = document.getElementById('text-fragment');

  $fakeTextElement.innerHTML = 'loading';

  generateText(textLength).then(text => {
    $fakeTextElement.innerHTML = text;
    $fakeTextElement.style.wordBreak = 'break-all';
    $fakeTextElement.onmouseup = function({ currentTarget }) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const { begin, end } = range.getIndexOfCharsIn(currentTarget);

      history.pushState(
        { text: selection.toString() },
        begin + '-' + end,
        begin + '-' + end
      );

      $fragmentElement.textContent = selection.toString();
    };
  });

  window.addEventListener('popstate', evt => {
    console.log(evt.state);
    if (evt.state.text) {
      $fragmentElement.innerText = evt.state.text;
    }
  });
})(Number(document.getElementById('text-length').value));

/**
 *
 * @param {number} words
 */
function generateText(words) {
  return new Promise(resolve => {
    setTimeout(() => {
      const letters = Array.from(
        { length: words },
        () =>
          Math.random()
            .toString(36)
            .substring(7)[0]
      );
      resolve(letters.join(''));
    }, 0);
  });
}
