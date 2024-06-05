import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

const articles = [
  {
    image: 'https://www.shutterstock.com/image-vector/happy-cute-kids-boy-girl-600nw-1566728953.jpg',
    date: '2023-12-07',
    title: 'Using Malicious AI to immunize AML Programs: Redefining the A...',
    category: 'Parvulo',
    url: '/article/1',
  },
  {
    image: 'https://www.mindicsalud.com/sites/default/files/styles/blog_full/public/elementary_kids.jpg?itok=mW6GsyKP',
    date: '2023-12-06',
    title: 'Best practice in private banking due diligence',
    category: 'Primaria',
    url: '/article/2',
  },
  {
    image: 'https://www.unicef.org/sites/default/files/styles/hero_tablet/public/UN0318726_CRC30_SP.jpg.webp?itok=DuDukEmR',
    date: '2005-12-06',
    title: 'Best practice in private banking due diligence',
    category: 'Primaria',
    url: '/article/3',
  },
  {
    image: 'https://img.lalr.co/cms/2024/05/03202902/WhatsApp-Image-2024-05-03-at-18.40.15.jpg?size=xs',
    date: '2004-12-06',
    title: 'Best practice in private banking due diligence',
    category: 'Primaria',
    url: '/article/4',
  },
  {
    image: 'https://i0.wp.com/educaqualitas.com/wp-content/uploads/2021/01/concetracion.jpg?fit=998%2C599&ssl=1',
    date: '2002-12-06',
    title: 'Best practice in private banking due diligence',
    category: 'Primaria',
    url: '/article/5',
  },
  // Añade más artículos según sea necesario
];

const ArticleCard = ({ article }) => {
  return (
    <Link href={article.url} legacyBehavior>
      <a className="block p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer">
        <div className="relative pb-2/3 mb-4">
          <img
            src={article.image}
            alt={article.title}
            className="h-36 w-full object-cover rounded-t-lg"
          />
        </div>
        <div className="mb-2 text-sm text-gray-500">
          {new Date(article.date).toLocaleDateString()}
        </div>
        <h2 className="text-lg font-semibold mb-2">
          {article.title}
        </h2>
        <div className="text-sm font-medium text-gray-700">
          {article.category}
        </div>
      </a>
    </Link>
  );
};

const NewsList = () => {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    filterArticles();
  }, [category, sortOrder, searchTitle]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const clearFilters = () => {
    setCategory('');
    setSortOrder('');
    setSearchTitle('');
  };

  const filterArticles = () => {
    let result = [...articles];

    if (category) {
      result = result.filter(article => article.category === category);
    }

    if (sortOrder) {
      result.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (sortOrder === 'newest') {
          return dateB - dateA;
        } else if (sortOrder === 'oldest') {
          return dateA - dateB;
        }
        return 0;
      });
    }

    if (searchTitle) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredArticles(result);
  };

  const uniqueCategories = [...new Set(articles.map(article => article.category))];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-center">
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchTitle}
          onChange={handleSearchTitleChange}
          className="w-full border p-2 rounded-lg"
        />
        <div className="flex flex-row justify-between md:space-x-4 w-full">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border p-2 rounded-lg md:w-full w-2/5"
          >
            <option value="" disabled hidden>Categoría</option>
            {uniqueCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="border p-2 rounded-lg md:w-full w-2/5"
          >
            <option value="" disabled hidden>Ordenar por fecha</option>
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antigua</option>
          </select>
          <button
            onClick={clearFilters}
            className="border p-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
