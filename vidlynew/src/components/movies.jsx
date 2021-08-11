import React, { Component } from 'react';
import MoviesTable from './common/moviesTable';
import Pagination from './common/pagination';
import { Paginate } from './utils/paginate';
import ListGroup from './common/listgroup';
import _, { filter } from 'lodash';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
class Movies extends Component {
    state = {
        currentPage:1,
        pageSize: 4,
        movies: [],
        genres: [],
        sortColumn: {path:'title',order:'asc'}
    }

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        this.setState({movies:getMovies(),genres});
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({currentPage:page});
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn});
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre:genre,currentPage:1});
    }
    
    handleNewMovie = () => {
        console.log('new movie');
    }

    getPagedData = () => {
        const { pageSize, currentPage, movies: allMovies,selectedGenre,sortColumn } = this.state;
        const filetered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filetered,[sortColumn.path],[sortColumn.order]);
        const movies = Paginate(sorted, currentPage, pageSize);
        
        return { totalCount:filetered.length, movies };
    }

    render() {

        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies,selectedGenre,sortColumn } = this.state;
        
        if (count === 0)
            return <p>There is no movies in the database</p>
        
        const filetered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filetered,[sortColumn.path],[sortColumn.order]);
        const movies = Paginate(sorted, currentPage, pageSize);
        
        //const { totalCount, data: movies } = this.getPagedData();
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={ this.state.selectedGenre}
                    /></div>
                <div className="col">
                    <button className="btn btn-primary" onClick={ this.handleNewMovie}>New Movie</button>
                    <p>Showing {filetered.length} movies in the database</p>
                    <MoviesTable
                        movies={movies}
                        onSort={this.handleSort}
                        sortColumn={ sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete} />
                <Pagination
                    itemsCount={filetered.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
                </div>
                </div>
        );
    }
}
 
export default Movies;