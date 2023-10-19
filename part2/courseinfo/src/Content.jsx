import Part from "./Part";

const Content = ({ parts }) => {

    const total = parts.reduce((s, p) => console.log(s.exercises))

    return(
        <ul>
            {parts.map(part => <Part part={part} key={part.id} />)}
        </ul>
    );
}

export default Content;