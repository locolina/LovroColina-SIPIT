$(document).ready(async function () {
  const $divText = $("#text_animation");
  const $brake = $("<br>");

  await typeSentence("Budi izvrstan u onome što vidiš!", "#text");
  await waitForMs(200);
  await deleteSentence("#text");
  await waitForMs(200);
  await typeSentence("voliš.", "#text");
  $divText.find("span:eq(1)").before($brake);
  await typeSentence("ZAISKRI.", "#zaiskri");
});

async function typeSentence(text, id, delay = 70) {
  const $element = $(id);
  for (const char of text) {
    await waitForMs(delay);
    $element.append(char);
  }
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deleteSentence(eleRef) {
  const $element = $(eleRef);
  const sentence = $element.html();

  while ($element.html().length > 26) {
    await waitForMs(150);
    $element.html($element.html().slice(0, -1));
  }
}
