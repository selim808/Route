var quotes = [
  { quote: "Be yourself; everyone else is already taken.", by: "Oscar Wilde" },
  {
    quote:
      "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    by: "Marilyn Monroe",
  },
  {
    quote:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    by: "Albert Einstein",
  },
  {
    quote:
      "Don`t walk in front of me… I may not follow Don`t walk behind me… I may not lead Walk beside me… just be my friend",
    by: "Albert Camus",
  },
  {
    quote:
      "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    by: "J.K. Rowling, Harry Potter and the Goblet of Fire",
  },
  {
    quote:
      "In three words I can sum up everything I've learned about life: it goes on.",
    by: "Robert Frost",
  },
  {
    quote: "Be the change that you wish to see in the world.",
    by: "Mahatma Gandhi",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    by: "Mae West",
  },
  {
    quote:
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    by: "Dr. Seuss",
  },
  {
    quote:
      "It is better to be hated for what you are than to be loved for what you are not.",
    by: "Andre Gide, Autumn Leaves",
  },
];

var previous = 0;

function GenerateQuote() {
  var number = Math.floor(Math.random() * 10);
  while (number === previous) {
    number = Math.floor(Math.random() * 10);
  }
  console.log(number);
  previous = number;
  document.getElementById("quote").innerHTML = quotes[number].quote;
  document.getElementById("by").innerHTML = quotes[number].by;
}
