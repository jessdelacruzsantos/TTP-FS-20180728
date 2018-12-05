import React from 'react'
import {Segment,Dimmer,Loader as SemanticLoader} from 'semantic-ui-react'

const Loader = (props) => (
    <div>
        <Segment style={{height:props.height}}>
        <Dimmer active inverted>
            <SemanticLoader indeterminate>Loading</SemanticLoader>
        </Dimmer>
        </Segment>
    </div>
)

export default Loader

