document.addEventListener("DOMContentLoaded", () => {
  // elementos de input
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  // botão e saídas
  const btnCalc = document.querySelector(".btn-calc");
  const outYears = document.getElementById("years");
  const outMonths = document.getElementById("months");
  const outDays = document.getElementById("days");
  // spans de erro
  const errDay = document.getElementById("error-day");
  const errMonth = document.getElementById("error-month");
  const errYear = document.getElementById("error-year");

  // evita que o form seja enviado
  btnCalc.type = "button";
  btnCalc.addEventListener("click", onClick);

  function onClick() {
    // containers de cada campo (para adicionar .error)
    const fieldDay = dayInput.parentElement;
    const fieldMonth = monthInput.parentElement;
    const fieldYear = yearInput.parentElement;

    // limpa erros visuais e textuais
    [errDay, errMonth, errYear].forEach((e) => e.classList.remove("active"));
    [fieldDay, fieldMonth, fieldYear].forEach((f) =>
      f.classList.remove("error")
    );

    // lê e converte valores
    const d = parseInt(dayInput.value, 10);
    const m = parseInt(monthInput.value, 10);
    const y = parseInt(yearInput.value, 10);

    // data atual
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let valid = true;

    // calcula quantos dias tem o mês informado (considera bissexto)
    const daysInMonth =
      y > 0 && m >= 1 && m <= 12 ? new Date(y, m, 0).getDate() : 31;

    // valida dia
    if (!d || d < 1 || d > daysInMonth) {
      errDay.classList.add("active");
      fieldDay.classList.add("error");
      valid = false;
    }

    // valida mês
    if (!m || m < 1 || m > 12) {
      errMonth.classList.add("active");
      fieldMonth.classList.add("error");
      valid = false;
    }

    // valida ano e data completa no futuro
    if (!y || y > currentYear) {
      errYear.classList.add("active");
      fieldYear.classList.add("error");
      valid = false;
    } else {
      const birthDate = new Date(y, m - 1, d);
      if (birthDate > today) {
        errYear.classList.add("active");
        fieldYear.classList.add("error");
        valid = false;
      }
    }

    // se algum campo inválido, zera resultado e retorna
    if (!valid) {
      outYears.textContent = "--";
      outMonths.textContent = "--";
      outDays.textContent = "--";
      return;
    }

    // cálculos de idade
    let years = currentYear - y;
    let months = currentMonth - m;
    let days = currentDay - d;

    // ajuste de dias negativos
    if (days < 0) {
      const prevMonthDays = new Date(
        currentYear,
        currentMonth - 1,
        0
      ).getDate();
      days += prevMonthDays;
      months--;
    }

    // ajuste de meses negativos
    if (months < 0) {
      months += 12;
      years--;
    }

    // exibe no DOM
    outYears.textContent = years;
    outMonths.textContent = months;
    outDays.textContent = days;
  }
});
