export interface IProvider {
  name: string,
  getUrl: (url: string) => string;
}

export const tiuqottigeloot_vol24_Tracks = [
  {
    url: '/Various%20Artists%20-%202009%20-%20netBloc%20Vol%2024_%20tiuqottigeloot%20%5BMP3-V2%5D/01%20-%20Diablo%20Swing%20Orchestra%20-%20Heroines.mp3',
    duration: 322.612245,
    metaData: {
      title: 'Heroines',
      artist: 'Diablo Swing Orchestra'
    }
  },
  {
    url: '/Various%20Artists%20-%202008%20-%20netBloc%20Vol%2013%20-%20Color%20in%20a%20World%20of%20Monochrome%20%5BAAC-40%5D/1.02.%20Solid%20Ground.m4a',
    duration: 13407768 / 44100,
    metaData: {
      title: 'Solid Ground',
      artist: 'Poxfil'
    }
  }
];

export const providers: { [providerId: string]: IProvider; } = {
  netlify: {
    name: 'Netlify',
    getUrl: url => 'https://test-audio.netlify.com' + url
  }
};
