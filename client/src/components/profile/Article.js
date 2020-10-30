import React, { Fragment } from 'react';
const Article = ({ article }) => {
	return (
		<Fragment>
			{article.image.length > 0 && (
				<div className="article__img__container">
					<img className="article__image" src={article.image[0]['url']} alt="" />
				</div>
			)}

			<div
				onClick={() => {
					window.location.replace(article.url);
				}}
				className="article__content"
			>
				<div className="article__description">{article.description}</div>
			</div>
		</Fragment>
	);
};

export default Article;
