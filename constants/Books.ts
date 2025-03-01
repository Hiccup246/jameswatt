export enum BookStatus {
  Read = "Read",
  Reading = "Reading",
}

export const BOOKS: Book[] = [
  {
    name: "The War of the Worlds",
    author: "H.G. Wells",
    genre: "Science Fiction",
    status: BookStatus.Reading,
    dateStarted: "01/03/2025",
    dateCompleted: "",
  },
  {
    name: "Cat's Cradle",
    author: "Kurt Vonnegut Jr.",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "23/02/2025",
    dateCompleted: "27/02/2025",
  },
  {
    name: "The Trading Game: A Confession",
    author: "Gary Stevenson",
    genre: "Biography",
    status: BookStatus.Read,
    dateStarted: "19/02/2025",
    dateCompleted: "23/02/2025",
  },
  {
    name: "Whispers Under Ground",
    author: "Ben Aaronovitch",
    genre: "Urban Fantasy",
    status: BookStatus.Read,
    dateStarted: "16/02/2025",
    dateCompleted: "18/02/2025",
  },
  {
    name: "Moon Over Soho",
    author: "Ben Aaronovitch",
    genre: "Urban Fantasy",
    status: BookStatus.Read,
    dateStarted: "12/02/2025",
    dateCompleted: "15/02/2025",
  },
  {
    name: "Rivers of London",
    author: "Ben Aaronovitch",
    genre: "Urban Fantasy",
    status: BookStatus.Read,
    dateStarted: "09/02/2025",
    dateCompleted: "11/02/2025",
  },
  {
    name: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "25/01/2025",
    dateCompleted: "09/02/2025",
  },
  {
    name: "Based on a True Story: Not a Memoir",
    author: "Norm Macdonald",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "20/01/2025",
    dateCompleted: "25/01/2025",
  },
  {
    name: "Death on the Nile",
    author: "Agatha Christie",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "09/01/2025",
    dateCompleted: "15/01/2025",
  },
  {
    name: "The Many Days: Selected Poems",
    author: "Norman MacCaig",
    genre: "Poetry",
    status: BookStatus.Read,
    dateStarted: "01/10/2024",
    dateCompleted: "10/11/2024",
  },
  {
    name: "The Crisis of Democratic Capitalism",
    author: "Martin Wolf",
    genre: "Economics",
    status: BookStatus.Read,
    dateStarted: "26/12/2023",
    dateCompleted: "06/01/2024",
  },
  {
    name: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "25/12/2023",
    dateCompleted: "25/12/2023",
  },
  {
    name: "Creativity: A Short and Cheerful Guide",
    author: "John Cleese",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "09/12/2023",
    dateCompleted: "09/12/2023",
  },
  {
    name: "The Restaurant at the End of the Universe",
    author: "Douglas Adams",
    genre: "Science Fiction",
    status: BookStatus.Read,
    dateStarted: "21/08/2023",
    dateCompleted: "25/08/2023",
  },
  {
    name: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "09/08/2023",
    dateCompleted: "20/08/2023",
  },
  {
    name: "And Then There Were None",
    author: "Agatha Christie",
    genre: "Mystery",
    status: BookStatus.Read,
    dateStarted: "05/08/2023",
    dateCompleted: "07/08/2023",
  },
  {
    name: "Five Dialogues: Euthyphro, Apology, Crito, Meno, Phaedo",
    author: "Plato",
    genre: "Philosophy",
    status: BookStatus.Read,
    dateStarted: "01/08/2023",
    dateCompleted: "04/08/2023",
  },
  {
    name: "Diddly Squat: a year on the farm",
    author: "Jeremy Clarkson",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "31/07/2023",
    dateCompleted: "31/07/2023",
  },
  {
    name: "Diddly Squat: Til The Cows Come Home",
    author: "Jeremy Clarkson",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "28/07/2023",
    dateCompleted: "29/07/2023",
  },
  {
    name: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    genre: "Philosophy",
    status: BookStatus.Read,
    dateStarted: "23/07/2023",
    dateCompleted: "28/07/2023",
  },
  {
    name: "The Undiscovered Self",
    author: "C.G. Jung",
    genre: "Psychology",
    status: BookStatus.Read,
    dateStarted: "22/07/2023",
    dateCompleted: "23/07/2023",
  },
  {
    name: "The Martian",
    author: "Andy Weir",
    genre: "Science Fiction",
    status: BookStatus.Read,
    dateStarted: "15/07/2023",
    dateCompleted: "21/07/2023",
  },
  {
    name: "The Power of Now",
    author: "Eckhart Tolle",
    genre: "Psychology",
    status: BookStatus.Read,
    dateStarted: "02/07/2023",
    dateCompleted: "15/07/2023",
  },
  {
    name: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "06/07/2023",
    dateCompleted: "13/07/2023",
  },
  {
    name: "The Courage to Be Disliked",
    author: "Ichiro Kishimi, Fumitake Koga",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "17/06/2023",
    dateCompleted: "28/06/2023",
  },
  {
    name: "Slaughterhouse-Five",
    author: "Kurt Vonnegut Jr",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "16/06/2023",
    dateCompleted: "18/06/2023",
  },
  {
    name: "Down and Out in Paris and London",
    author: "George Orwell",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "14/06/2023",
    dateCompleted: "15/06/2023",
  },
  {
    name: "Outgrowing God: A Beginner's Guide to Atheism",
    author: "Richard Dawkins",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "11/06/2023",
    dateCompleted: "13/06/2023",
  },
  {
    name: "The Trial",
    author: "Franz Kafka, Max Brod, Willa Muir, Edwin Muir",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "08/06/2023",
    dateCompleted: "10/06/2023",
  },
  {
    name: "Murder on the Orient Express",
    author: "Agatha Christie",
    genre: "Mystery",
    status: BookStatus.Read,
    dateStarted: "28/05/2023",
    dateCompleted: "08/06/2023",
  },
  {
    name: "In Search Of Excellence",
    author: "Thomas J. Peters, Robert H. Waterman Jr.",
    genre: "Business",
    status: BookStatus.Read,
    dateStarted: "17/04/2023",
    dateCompleted: "21/05/2023",
  },
  {
    name: "A Clockwork Orange",
    author: "Anthony Burgess",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "10/04/2023",
    dateCompleted: "14/04/2023",
  },
  {
    name: "The Hitchiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction",
    status: BookStatus.Read,
    dateStarted: "08/04/2023",
    dateCompleted: "09/04/2023",
  },
  {
    name: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    status: BookStatus.Read,
    dateStarted: "04/04/2023",
    dateCompleted: "08/04/2023",
  },
  {
    name: "The End of Faith: Religion, Terror, and the Future of Reason",
    author: "Sam Harris",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "24/03/2023",
    dateCompleted: "04/04/2023",
  },
  {
    name: "The God Delusion",
    author: "Richard Dawkins",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "13/03/2023",
    dateCompleted: "24/03/2023",
  },
  {
    name: "God Is Not Great: How Religion Poisons Everything",
    author: "Christopher Hitchens",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "10/03/2023",
    dateCompleted: "13/03/2023",
  },
  {
    name: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Science Fiction",
    status: BookStatus.Read,
    dateStarted: "07/03/2023",
    dateCompleted: "10/03/2023",
  },
  {
    name: "It's OK to be Angry About Capitalism",
    author: "Bernie Sanders",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "01/03/2023",
    dateCompleted: "04/03/2023",
  },
  {
    name: "Built to Last: Successful Habits of Visionary Companies",
    author: "James C. Collins, Jerry I. Porras",
    genre: "Business",
    status: BookStatus.Read,
    dateStarted: "23/02/2023",
    dateCompleted: "28/02/2023",
  },
  {
    name: "Thinking in Systems: A Primer",
    author: "Donella H. Meadows and Diana Wright",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "20/02/2023",
    dateCompleted: "23/02/2023",
  },
  {
    name: "The Pragmatic Programmer: From Journeyman to Master",
    author: "Andy Hunt, Dave Thomas",
    genre: "Programming",
    status: BookStatus.Read,
    dateStarted: "05/09/2020",
    dateCompleted: "19/02/2023",
  },
  {
    name: "The Dawn of Everything",
    author: "David Greaber and David Wengrow",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "13/01/2023",
    dateCompleted: "02/02/2023",
  },
  {
    name: "The Hero of Ages",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    status: BookStatus.Read,
    dateStarted: "09/01/2023",
    dateCompleted: "12/01/2023",
  },
  {
    name: "The Well of Ascension",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    status: BookStatus.Read,
    dateStarted: "05/01/2023",
    dateCompleted: "08/01/2023",
  },
  {
    name: "Stolen Focus",
    author: "Johann Hari",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "01/01/2023",
    dateCompleted: "03/01/2023",
  },
  {
    name: "The Final Empire",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    status: BookStatus.Read,
    dateStarted: "26/12/2022",
    dateCompleted: "01/01/2023",
  },
  {
    name: "The Black Swan: The Impact of the Highly Improbable",
    author: "Nassim Nicholas Taleb",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "26/09/2022",
    dateCompleted: "24/12/2022",
  },
  {
    name: "Wordslut: A Feminist Guide to Taking Back the English Language",
    author: "Amanda Montell",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "12/09/2022",
    dateCompleted: "25/09/2022",
  },
  {
    name: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "Biography",
    status: BookStatus.Read,
    dateStarted: "24/07/2022",
    dateCompleted: "11/09/2022",
  },
  {
    name: "Brave New World",
    author: "Aldous Huxley",
    genre: "Fiction",
    status: BookStatus.Read,
    dateStarted: "09/07/2022",
    dateCompleted: "23/07/2022",
  },
  {
    name: "Modern Conspiracies in America: Separating Fact from Fiction",
    author: "Michael D. Gambone",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "11/06/2022",
    dateCompleted: "26/06/2022",
  },
  {
    name: "Cultish: The Language of Fanaticism",
    author: "Amanda Montell",
    genre: "Nonfiction",
    status: BookStatus.Read,
    dateStarted: "21/05/2022",
    dateCompleted: "11/06/2022",
  },
  {
    name: "How to Lie with Statistics",
    author: "Darrell Huff",
    genre: "Mathmatics",
    status: BookStatus.Read,
    dateStarted: "21/05/2021",
    dateCompleted: "04/06/2022",
  },
  {
    name: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophy",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2022",
  },
  {
    name: "A Promised Land",
    author: "Barack Obama",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2022",
  },
  {
    name: "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life",
    author: "Mark Manson",
    genre: "Self Help",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2022",
  },
  {
    name: "Peril",
    author: "Bob Woodward, Robert Costa",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2022",
  },
  {
    name: "21 Lessons for the 21st Century",
    author: "Yuval Noah Harari",
    genre: "Sociology",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2022",
  },
  {
    name: "The Anthropocene Reviewed",
    author: "John Green",
    genre: "Short Stories",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2022",
  },
  {
    name: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "Rage",
    author: "Bob Woodward",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "On Having No Head",
    author: "Douglas E. Harding",
    genre: "Spirituality",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "The Lord of the Rings The Return of the King",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "The Lord of the Rings The Two Towers",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "Lord of the Rings the Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "12 Rules for Life: An Antidote to Chaos",
    author: "Jordan B. Peterson",
    genre: "Self Help",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "History",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "Propaganda",
    author: "Edward L. Bernays",
    genre: "Psychology",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "Fear: Trump in the White House",
    author: "Bob Woodward",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "Animal Farm",
    author: "George Orwell",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "1984",
    author: "George Orwell",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "Manufacturing Consent",
    author: "Edward S. Herman, Noam Chomsky",
    genre: "Politics",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
  {
    name: "The Power of Now",
    author: "Eckhart Tolle",
    genre: "Spirituality",
    status: BookStatus.Read,
    dateStarted: "",
    dateCompleted: "2021",
  },
];
