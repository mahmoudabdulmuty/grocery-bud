import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Alert from './Alert';
import List from './List';

function App() {
	const [name, setName] = useState('');
	const [list, setList] = useState(
		() => JSON.parse(localStorage.getItem('list')) || []
	);
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: ''
	});

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) {
			setAlert({
				...alert,
				show: true,
				type: 'danger',
				msg: 'please enter a value'
			});
		} else if (name && isEditing) {
		} else {
			setList((prevList) => [...prevList, { id: nanoid(), title: name }]);
			setName('');
			setAlert({
				...alert,
				show: true,
				type: 'success',
				msg: 'item added to the list'
			});
		}
	};

	const handleDelete = (id) => {
		setList((prevList) => {
			return prevList.filter((item) => {
				return item.id !== id;
			});
		});
		setAlert({
			...alert,
			show: true,
			type: 'danger',
			msg: 'item removed from the list'
		});
	};

	const handelClear = () => {
		setList([]);
		setAlert({
			...alert,
			show: true,
			type: 'danger',
			msg: 'empty list'
		});
	};

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list));
	}, [list]);

	return (
		<section className="section-center">
			<form className="grocery-form">
				{alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
				<h3>Grocery Bud</h3>
				<div className="form-control">
					<input
						type="text"
						placeholder="e.g. eggs"
						className="grocery"
						value={name}
						onChange={handleChange}
					/>
					<button className="submit-btn" onClick={handleSubmit}>
						{isEditing ? 'edit' : 'Submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className="grocery-container">
					<List setAlert={setAlert} handleDelete={handleDelete} list={list} />
					<button onClick={handelClear} className="clear-btn">
						clear items
					</button>
				</div>
			)}
		</section>
	);
}

export default App;
