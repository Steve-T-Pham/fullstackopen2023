import Part from "./Part";

const Content = ({ parts }) => {

    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return(
        <div>
                {parts.map(part => <Part part={part} key={part.id} />)}
            <p><strong>total of {total} exercises</strong></p>
        </div>
        );
}

export default Content;