import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import DbTable from './DbTable';

// class DbReader extends React.Component {
//     constructor(props){
//       super(props);
//       this.state = {data: [], fetching: true};
//     }
  
//     componentDidMount() {
//       fetch("/admin/contact/api")
//         .then((res) => res.json())
//         .then((json) => {
//           this.setState({data: json, fetching: false});
//         })
//         .catch((error) => {
//           console.error(error);
//           this.setState({fetching: false});
//         });
//     }
  
//     render() {
//       if(this.state.fetching){
//         return <h1>LOADING...</h1>;
//       } else if (this.state.data.length <= 0) {
//         return <h1>DATABASE EMPTY</h1>;
//       }
//       //const keys = this.state.data[0].keys();
//       // console.log(Object.keys(this.state.data[0])[0]);
  
//       // const title = Object.keys(this.state.data[0])[1];
//       // const id = Object.keys(this.state.data[0])[0];
//       //const item = this.state.data[0][Object.keys(this.state.data[0])[1]];
  
//       // const list = (
//       //   <div>
//       //     <h3>{title}</h3>
//       //     <ul>
//       //       {this.state.data.map(e => <li key={e[id]}>{e[title]}</li>)}
//       //     </ul>
//       //   </div>
//       // );
//       const keys = Object.keys(this.state.data[0]);
//       const listItems = keys.map(key => {
//         var title = key;
//         const id = Object.keys(this.state.data[0])[0];
//         console.log(id);
//         if (title == 'id') {
//           return null;
//         }
//         return (
//           <div>
//             <h3>{title}</h3>
//             <ul>
//               {this.state.data.map(e => <li key={e[id]}>{e[title]}</li>)}
//             </ul>
//           </div>
//         );
//       });
  
//       return (
//         <div>
//           {listItems}
//         </div>
//       );
//     }
//   }

export default function DbReader() {
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true)

    const fetchDb = () => {
        fetch("/admin/contact/api")
        .then((res) => res.json())
        .then((json) => {
            setData(json);
            setFetching(false);
        })
        .catch((error) => {
            console.error(error);
            setFetching(false);
        });      
    }

    useEffect(fetchDb, []);

    console.log(data);

    if(fetching){
        return ( 
            <CircularProgress />
        );
    } else if (data.length <= 0) {
        return (
            <Typography align='center' variant='h1'>
                DATABASE EMPTY
            </Typography>
        );
    }

    return (
        <div>
            <DbTable data={data} />
        </div>
    );
}