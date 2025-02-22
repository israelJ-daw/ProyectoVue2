export const fetchFeaturedData = async () => {
  try {
    const proxy = "http://localhost:8080/"; // Tu proxy local
    const artistsUrl = "https://api.deezer.com/chart/0/artists";
    const songsUrl = "https://api.deezer.com/chart/0/tracks";

    const requestOptions = {
      headers: {
        "X-Requested-With": "XMLHttpRequest", // Cabecera obligatoria para CORS Anywhere
      },
    };

    const [artistsResponse, songsResponse] = await Promise.all([
      fetch(proxy + artistsUrl, requestOptions),
      fetch(proxy + songsUrl, requestOptions),
    ]);

    const artistsData = await artistsResponse.json();
    const songsData = await songsResponse.json();

    console.log("🎤 Artistas:", artistsData);
    console.log("🎵 Canciones:", songsData);

    return {
      artists: artistsData.data || [],
      songs: songsData.data || [],
    };
  } catch (error) {
    console.error("❌ Error al obtener datos:", error);
    return { artists: [], songs: [] };
  }
};
