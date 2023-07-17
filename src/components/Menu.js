import React, { useState } from 'react';
import './../App.css';
import Header from './Header';

function Menu({onMenuClick}) {
    const [menuItems, setMenuItems] = useState([])
    const [isAddNewMenuItemShowing, setAddNewMenuItemShowing] = useState(false);
    const [text, setText] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    function menuItem(listItem) {
        return (
            <div className={ selectedItem === listItem ? 'menu-item active' : 'menu-item'}
            style={{ margin: "5px", borderBottom: "lightgray 1px solid" }} onClick={ () => { onMenuClick(listItem); setSelectedItem(listItem) } }>
                <a style={{ fontSize: "20px" }} >{listItem.name} </a>
                <span className='delete-item' onClick={() => setMenuItems(menuItems.filter(element => element.id != listItem.id))}> &times; </span>
            </div>
        );
    }

    function addNewListItem(item) {
        setMenuItems([...menuItems, item])
        setAddNewMenuItemShowing(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (text.trim()) {
            addNewListItem({ id: Math.random(100000), name: text });
            setText('');
        }
    }

    function handleChange(event) {
        setText(event.target.value);
    }

    return (
        <div className="menu" style={{ width: "300px", background: "beige", height: "100vh" }}>
            <Header/>
            <div className='menu-items-container' style={{ padding: "20px 10px" }}>
                {menuItems.map(element => menuItem(element))}
                {
                    isAddNewMenuItemShowing || menuItems.length === 0 ? (
                        <form onSubmit={handleSubmit} className='list-item-form'>
                            <h3>Add New List</h3>
                            <input className='input' type="text" value={text} onChange={handleChange} placeholder='Groceries'/>
                            <br/>
                            <button className='button' type="submit">Create</button>
                        </form>
                    ) : (
                        <button className='button add-new-list' onClick={() => setAddNewMenuItemShowing(true)}>Add New </button>
                    )
                }
            </div>
        </div>
    )
}

export default Menu