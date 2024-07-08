import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    albumsData.forEach((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, [id, albumsData]);

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8">
        <img className="w-48 rounded-lg shadow-lg" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col text-white">
          <p className="text-sm font-light uppercase">Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4 className="text-lg font-medium">{albumData.desc}</h4>
          <p className="mt-1 flex items-center">
            <img className="inline-block w-5 mr-1" src={assets.pause_icon} alt="Musicly" />
            <b>Musicly</b>
            <span className="mx-2">•</span>
            1,323,154 likes
            <span className="mx-2">•</span>
            <b>50 songs,</b>
            about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.pause_icon} alt="Pause Icon" />
      </div>
      <hr />
      {songsData.filter((item) => item.album === albumData.name).map((item, index) => (
        <div
          onClick={() => playWithId(item._id)}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white flex items-center">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt={item.name} />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  ) : null;
};

export default DisplayAlbum;
