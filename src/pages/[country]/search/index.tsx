import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MovieContainerVertical from "@/common/components/movieContainerVertical";
import SerieContainerVertical from "@/common/components/serieContainerVertical";
import { TMDBDiscover } from "@/common/types/tmdbDiscover";
import { TMDBMovie } from "@/common/types/tmdbMovie";
import { TMDBSerie } from "@/common/types/tmdbSerie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Props = {
  language: string;
  discoverMovies: TMDBDiscover;
  discoverSeries: TMDBDiscover;
  //discoverActors: TMDBDiscover;
  searchTerm: string;
};

export default function Search(props: Props) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div>
      <div className="contenedorTituloThumbs">
        <h2 className="h2-italic">Búsqueda:&nbsp;</h2>
        <h2 className="h2-italic">{props.searchTerm}</h2>
      </div>
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList className="custom-tab-list">
          <Tab className="custom-tab" selectedClassName="custom-tab-selected">Películas</Tab>
          <Tab className="custom-tab" selectedClassName="custom-tab-selected">Series</Tab>
          <Tab className="custom-tab" selectedClassName="custom-tab-selected">Cast</Tab>
        </TabList>

        <TabPanel>
          <MovieContainerVertical
            language={props.language}
            movies={props.discoverMovies.results as TMDBMovie[]}
          />
        </TabPanel>
        <TabPanel>
          <SerieContainerVertical
            language={props.language}
            series={props.discoverSeries.results as TMDBSerie[]}
          />
        </TabPanel>
        <TabPanel>
          {/* Actors content */}
          {/* Add your code for Actors here */}
        </TabPanel>
      </Tabs>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const language: string = context.query?.language?.toString() || "en-US";
  const country: string = context.params?.country as string;
  const searchTerm: string = context.query?.searchTerm?.toString() || "";

  const movieProviders = await fetch(
    `${process.env.THEMOVIEDB_API_URL}/watch/providers/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&watch_region=${country}`
  ).then((x) => x.json());
  const tvProviders = await fetch(
    `${process.env.THEMOVIEDB_API_URL}/watch/providers/tv?api_key=${process.env.THEMOVIEDB_API_KEY}&watch_region=${country}`
  ).then((x) => x.json());
  const actorProviders = await fetch(
    `${process.env.THEMOVIEDB_API_URL}/watch/providers/actors?api_key=${process.env.THEMOVIEDB_API_KEY}&watch_region=${country}`
  ).then((x) => x.json());

  const movieProvidersString: string = movieProviders.results
    .map((provider: any) => provider.provider_id)
    .join("|");
  const tvProvidersString: string = tvProviders.results
    .map((provider: any) => provider.provider_id)
    .join("|");
  /*const actorProvidersString: string = actorProviders.results
    .map((provider: any) => provider.provider_id)
    .join("|");*/

  const discoverMovies: TMDBDiscover = await fetch(
    `${process.env.THEMOVIEDB_API_URL}/discover/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&with_text_query=${searchTerm}&language=${language}&watch_region=${country}&with_watch_providers=${movieProvidersString}&sort_by=popularity.desc`
  ).then((x) => x.json());
  const discoverSeries: TMDBDiscover = await fetch(
    `${process.env.THEMOVIEDB_API_URL}/discover/tv?api_key=${process.env.THEMOVIEDB_API_KEY}&with_text_query=${searchTerm}&language=${language}&watch_region=${country}&with_watch_providers=${tvProvidersString}&sort_by=popularity.desc`
  ).then((x) => x.json());
  /*const discoverActors: TMDBDiscover = await fetch(
    `${process.env.THEMOVIEDB_API_URL}/discover/actors?api_key=${process.env.THEMOVIEDB_API_KEY}&with_text_query=${searchTerm}&language=${language}&watch_region=${country}&with_watch_providers=${actorProvidersString}&sort_by=popularity.desc`
  ).then((x) => x.json());*/

  return {
    props: {
      language,
      discoverMovies,
      discoverSeries,
      //discoverActors,
      searchTerm,
    },
  };
};
