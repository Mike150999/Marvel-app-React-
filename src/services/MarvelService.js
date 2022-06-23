import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {

	const { loading, request, error, clearError } = useHttp();

	// _apeBase = 'https://gateway.marvel.com:443/v1/public/';
	// _apiKey = 'apikey=ab1cbb3e992820bc75d94d62bd60dbd0';
	const _apeBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=f63a794b8026084ccf59e0945ecaa44d';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apeBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_tranformCharacter);
	}
	const getOneCharacters = async (id) => {
		const res = await request(`${_apeBase}characters/${id}?${_apiKey}`);
		return _tranformCharacter(res.data.results[0]);
	}

	const getAllComics = async (offset = 0) => {
		const res = await request(`${_apeBase}comics?&limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_tranformComics);

	}

	const getOneComics = async (id) => {
		const res = await request(`${_apeBase}comics/${id}?${_apiKey}`);
		return _tranformComics(res.data.results[0]);
	}

	const _tranformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}

	const _tranformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || 'There is no description',
			pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
			thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
			language: comics.textObjects.language || 'en-us',
			price: comics.prices.price ? `${comics.prices.price}$` : 'not available'

		}
	}

	return { loading, error, clearError, getAllCharacters, getOneCharacters, getAllComics, getOneComics }
}

export default useMarvelService;