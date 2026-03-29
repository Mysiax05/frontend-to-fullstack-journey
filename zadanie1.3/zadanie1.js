function funkcja_zwrotna() {
  let text = document.forms[0].elements["pole_tekstowe"].value;
  let number = document.forms[0].elements["pole_liczbowe"].value;

  console.log(text + ":" + typeof text);
  console.log(number + ":" + typeof number);
}
