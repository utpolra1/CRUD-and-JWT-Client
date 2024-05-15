import React from 'react';

const BlogFilter = () => {
    return (
        <form method='GET' action="">
            <label>
                Filter by Category :
                <select className='rounded-md'>
                    <option name="surgery" value="surgery">Surgery</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                </select>
            </label>
            <input className='ml-4' name="search" placeholder='Serach' type="text" />
            <button type='submit' className='btn'>Search</button>
        </form>
    );
};

export default BlogFilter;
