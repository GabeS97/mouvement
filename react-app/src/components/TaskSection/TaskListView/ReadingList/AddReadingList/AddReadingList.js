import React from 'react'

const AddReadingList = ({ boardId }) => {

    const handleSumbit = (e) => {
        e.preventDefault()

        const create_media = {

        }
    }
    return (
        <div className='addReadingList'>
            <form className='addReadingList__form' onSubmit={handleSumbit}>
                <div className="addReadingList_tasks">
                    <input

                    />
                </div>

                <div className="addReadingList_author">
                    <input

                    />
                </div>

                <div className="addReadingList__descriptiom">
                    <input

                    />
                </div>

                <div className="addReadingList__custom__select">
                    <select >
                        {/* <option disabled>Templates</option> */}
                        <option disabled>Select Media</option>
                        <option value='Books'>Books</option>
                        <option value='Article'>Article</option>
                        {/* <option value='Reading List'>Reading List</option> */}
                        <option value='Podcast'>Podcast</option>
                        <option value='Video'>Video</option>
                    </select>
                </div>
                <button type='submit'>Create new list</button>
            </form>
        </div>
    )
}

export default AddReadingList
