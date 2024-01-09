import {useState} from "react";
import axios from "axios";
import Select from 'react-select'

const Workout = ({
                     _id,
                     bodyPart,
                     equipment,
                     id,
                     image,
                     level,
                     name,
                     target,
                     secondaryMuscle,
                     instructions,
                     description,
    }) => {

    const [showInstructions, setShowInstructions] = useState(false)

    const setWorkoutLevel = async (levelUpdate) => {
        try {
            const response = await axios.post("http://localhost:8800/api/v1/workouts/level", { fileId: id, level: levelUpdate })
            console.log(response.data)
        } catch (error) {
            throw new Error(error)
        }

    }

    if (!image) return

    return (
        <section className="card">
            <div className="card-body text-capitalize">
                <h4 className="card-title">
                    {name || WorkOut }
                </h4>
                <p>
                    {id}
                </p>
                <div>
                    <h4>Target Muscle: {target}</h4>
                </div>
                <div>
                    <h5>Level: {level}</h5>
                </div>
                <div className="text-center">
                    <img src={image} alt="gif"/>
                </div>
                <div>
                    { !!description && description }
                </div>
                <div>
                    <button onClick={()=>setShowInstructions(!showInstructions)}>{showInstructions ? "Hide" : "Show" } Instructions</button>
                  {
                    showInstructions &&
                    <ol>
                      {instructions.map((instruction, index) => <li key={index}>{index + 1}: {instruction}</li>)}
                    </ol>
                  }

                </div>
                <Select
                    label="Change Level"
                    htmlFor="level"
                    options={[
                        { label: "Beginner", value: "1"} ,
                        { label: "Intermediate", value: "2"} ,
                        { label: "Expert", value: "3"}
                    ]}
                    onChange={(e)=>setWorkoutLevel(e.value)}
                >

                </Select>
            </div>



        </section>
    );
};

export default Workout;