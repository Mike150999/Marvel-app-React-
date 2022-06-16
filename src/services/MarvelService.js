
class MarvelService {
	// _apeBase = 'https://gateway.marvel.com:443/v1/public/';
	// _apiKey = 'apikey=ab1cbb3e992820bc75d94d62bd60dbd0';
	_apeBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=f63a794b8026084ccf59e0945ecaa44d';
	_baseOffset = 210;

	getResourse = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	}

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResourse(`${this._apeBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
		return res.data.results.map(this._tranformCharacter);
	}
	getOneCharacters = async (id) => {
		const res = await this.getResourse(`${this._apeBase}characters/${id}?${this._apiKey}`);
		return this._tranformCharacter(res.data.results[0]);
	}


	_tranformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description.length > 200 ? (`${char.description.slice(0, 200)}` + `...`) : char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}



}

export default MarvelService;