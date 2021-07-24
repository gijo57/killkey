const TILE_SIZE = 48;

const CAMERA_PADDING_VERTICAL = 300;
const CAMERA_PADDING_HORIZONTAL = 500;

const mapTextureSources = {
  1: {
    src: 'images/textures.png',
    sxWall: 3 * TILE_SIZE,
    syWall: 2.5 * TILE_SIZE,
    sxFloor: 1.5 * TILE_SIZE,
    syFloor: 0,
    swidthWall: 22,
    sheightWall: 22,
    swidthFloor: 22,
    sheightFloor: 22,
    widthWall: TILE_SIZE + 2,
    heightWall: TILE_SIZE + 2,
    widthFloor: TILE_SIZE + 1,
    heightFloor: TILE_SIZE + 1,
    decors: {
      1: 'images/map1decor/bedvertical.png',
      2: 'images/map1decor/sinkhorizontal.png',
      3: 'images/map1decor/shelfvertical.png',
      4: 'images/map1decor/vialvertical.png'
    },
    decorSize: {
      width: 60,
      height: 60
    }
  },
  2: {
    src: 'images/textures2.png',
    sxWall: 311,
    syWall: 344,
    sxFloor: 830,
    syFloor: 320,
    swidthWall: 40,
    sheightWall: 40,
    swidthFloor: 40,
    sheightFloor: 40,
    widthWall: TILE_SIZE + 3,
    heightWall: TILE_SIZE + 3,
    widthFloor: TILE_SIZE + 12,
    heightFloor: TILE_SIZE + 12,
    decors: {
      1: 'images/map2decor/tombvertical.png',
      2: 'images/map2decor/tombhorizontal.png',
      3: 'images/map2decor/barrel.png',
      4: 'images/map2decor/crate.png'
    },
    decorSize: {
      width: 30,
      height: 30
    }
  }
};
