import { BitmapLayer } from "@deck.gl/layers"
import React from "react"

const bodenrichtwertMannheimLayer = () => new BitmapLayer({
    id: 'Bitmaplayer',
    bounds: [8.43, 49.44, 8.55, 49.53],
    image: bodenRichtwertMannheim,
    pickable: true,
  })

export default bodenrichtwertMannheimLayer;