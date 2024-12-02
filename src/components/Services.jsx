import { Text } from '@consta/uikit/TextDeprecated';
import ReactPaginate from 'react-paginate';
import './Services.css';
import { SkeletonBrick } from '@consta/uikit/Skeleton';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '@/store/services';
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import ServiceDetails from "@/pages/ServiceDetails.jsx";
import { Link } from 'react-router-dom';
const PAGE_SIZE = 8;

const Services = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});

    const { services = [], isLoading, error } = useSelector((state) => state.services);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const pageCount = Math.ceil(services.length / PAGE_SIZE);

    const displayedServices = services.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleImageLoad = (id) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div>
            <Text style={{padding: '20px'}} size={'3xl'} weight={'bold'}>
                Услуги
            </Text>
            {error && <p style={{color: 'red'}}>Ошибка: {error}</p>}

            <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
                {isLoading
                    ? Array.from({length: PAGE_SIZE}).map((_, index) => (
                        <div key={index} style={{width: '272px', padding: '16px'}}>
                            <div
                                style={{height: '350px'}}
                                className="w-60 h-80 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
                            >
                                <SkeletonBrick height={200} className="rounded-2xl skeletonbrick-color"/>
                                <div style={{height: '200px', width: '100%'}}>
                                    <SkeletonBrick
                                        height={30}
                                        style={{width: '100%', marginTop: '20px'}}
                                        className="rounded-xl skeletonbrick-color"
                                    />
                                    <SkeletonBrick
                                        className="skeletonbrick-color rounded-xl"
                                        style={{marginTop: '30px'}}
                                        height={50}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                    : displayedServices.map((service) => (
                        <div key={service.id} style={{width: '272px', padding: '16px'}}>
                            <div
                                style={{height: '350px'}}
                                className="w-60 h-80 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
                            >
                                <div style={{position: 'relative', width: '100%', height: '160px'}}>
                                    {!loadedImages[service.id] && (
                                        <div>
                                            <SkeletonBrick height={155} className="skeletonbrick-color rounded-2xl"/>
                                            <div style={{height: '200px', width: '100%'}}>
                                                <SkeletonBrick
                                                    height={30}
                                                    style={{width: '100%', marginTop: '27px'}}
                                                    className="skeletonbrick-color rounded-xl"
                                                />
                                                <SkeletonBrick
                                                    className="skeletonbrick-color rounded-xl"
                                                    style={{marginTop: '30px'}}
                                                    height={50}
                                                />
                                            </div>
                                        </div>


                                    )}
                                    <img
                                        className="w-full h-full object-cover rounded-2xl"
                                        src={service.imgCard}
                                        alt={service.title}
                                        style={{
                                            display: loadedImages[service.id] ? 'block' : 'none',
                                        }}
                                        onLoad={() => handleImageLoad(service.id)}
                                    />
                                </div>
                                <div style={{height: '200px'}}>
                                    <div style={{height: '60px', paddingTop: '10px'}}>
                                        <p className="font-extrabold" style={{
                                            display: loadedImages[service.id] ? 'block' : 'none',
                                        }}>{service.title}</p>
                                    </div>
                                    <p style={{
                                        display: loadedImages[service.id] ? 'block' : 'none',
                                    }}>{service.description.slice(0, 40)}...</p>
                                </div>

                                <Link style={{
                                    display: loadedImages[service.id] ? 'block' : 'none',
                                }} to={`/services/${service.id}`} className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
                                    See more
                                </Link>


                            </div>
                        </div>
                    ))}
            </div>

            <ReactPaginate
                previousLabel={'← Назад'}
                nextLabel={'Вперед →'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
            />
        </div>
    );
};

export default Services;
