import { format } from "date-fns";

export default function About() {
  return (
    <main className="About">
      <p>This is a Blogging website build with React JS library. This is a react js project build on {format(new Date(2023, 4, 14), 'dd MMM, yyy')}.</p>
      <br />
      <hr />
      <img src="../public/Zawad.jpg" style={{
        width: "240px",
        padding: '1rem 0 0.2rem 0',
        borderRadius: '15%'
      }} />

      <p>Name: Zawad Bin Sharif</p>
      <p>University: Northern University of Business and Technology, Khulna, Bangladesh</p>
      <p>Program: Computer Science and Engineering</p>
      <p>Age: {format(new Date(), 'yyy') - 2001}, Male</p>
      <p>GitHub: www.github.com/ZAWADBINSHARIF.com</p>
      <p>Email: zawadsharif@outlook.com</p>

    </main>
  )
}