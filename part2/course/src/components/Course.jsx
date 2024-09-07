const Course = ({course}) => {
    return (
      <>
      <h1>{course.name}</h1>
      <ul>
      {course.parts.map((c) => <li key={c.id}>{c.name} {c.exercises} </li>)}
      </ul>
      <p><b>total of {course.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b></p>
      </>
    )
  }

export default Course
