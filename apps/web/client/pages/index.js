import React from "react"
import Typography from "material-ui/Typography"

import withMainLayout from "../layouts/main"

const IndexPage = () => (
  <div>
    <Typography variant="display1" gutterBottom>
      Hello WHCS
    </Typography>
  </div>
)

export default withMainLayout(IndexPage)
