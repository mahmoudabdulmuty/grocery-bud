import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ list, handleDelete, handleEdit }) => {
	return (
		<section className="grocery-list">
			{list.map((item) => {
				const { id, title } = item;
				return (
					<article className="grocery-item" key={id}>
						<p className="title">{title}</p>
						<div className="btn-container">
							<button className="edit-btn">
								<FaEdit onClick={() => handleEdit(id)} />
							</button>
							<button className="delete-btn">
								<FaTrash onClick={() => handleDelete(id)} />
							</button>
						</div>
					</article>
				);
			})}
		</section>
	);
};

export default List;
