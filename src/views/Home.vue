<template>
  <div class="home">
           <v-dialog
            v-model="flag"
            hide-overlay
            persistent
            width="300">

            <v-card
              color="info"
              dark>

              <v-card-text>
                Loading
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
    <v-layout wrap>
      <v-flex xs12 md5 lg5>
            <v-layout class="pt-5 pl-5 pb-0 pr-5 list_content info" justify-center align-center wrap>
                <v-flex align-self-center xs6 md12 lg12>
                    <h4 class="white--text">
                        Search companies by symbol
                    </h4>
                </v-flex>
                <v-flex  class="textfield_search mt-5">
                   <input @keyup.enter="search_method"  v-model="busqueda" type="text" placeholder="Search Symbol">
                    <img @click="search_method" src="../assets/Asset_Search.svg" alt="">
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex id="tap_gain_companies" @click="show_gain_companies()" class="active_tap pt-3 pb-3" text-center xs6>Top Most Active Companies</v-flex>
                <v-flex id="tap_active_companies" @click="show_active_companies()" class="pt-3 pb-3" text-center xs6>Top Gain Companies</v-flex>
            </v-layout>

            <v-layout justify-center>
                <v-flex>
                    <ul id="gain_companies_ul"  style="padding: 0; list-style:none;">
                        <li @click="refreshDetail(index, masterArrayActive)" v-for="(item, index) of masterArrayActive" :key="index">
                            <div class="pt-3 pb-3 pl-4 pr-4 table_row">
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <h5>{{masterArrayActive[index].name}}</h5>

                                    </v-flex>
                                    <v-flex xs12 justify-center align-center justify-start>
                                        <span>
                                            {{masterArrayActive[index].symbol}}
                                        </span>
                                        <span>
                                            {{index + 1}}
                                        </span>

                                    </v-flex>
                                </v-layout>
                            </div>
                        </li>
                    </ul>

                      <ul id="active_companies_ul" style="padding: 0; list-style:none;" >
                        <li @click="refreshDetail(index, masterArrayGain) " v-for="(item, index) of masterArrayGain" :key="index">
                          
                            <div class="pt-3 pb-3 pl-4 pr-4 table_row">
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <h5>{{masterArrayGain[index].name}}</h5>

                                    </v-flex>
                                    <v-flex xs12 justify-center align-center justify-start>
                                        <span>
                                            {{masterArrayGain[index].symbol}}
                                        </span>
                                        <span>
                                            sss
                                        </span>

                                    </v-flex>
                                </v-layout>
                            </div>
                        </li>
                    </ul>

                    
                      <ul id="search_companies_ul" style="padding: 0; list-style:none;" >
                        <li @click="refreshDetail(index, masterArraySearch) " v-for="(item, index) of masterArraySearch" :key="index">
                          
                            <div class="pt-3 pb-3 pl-4 pr-4 table_row">
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <h5>{{masterArraySearch[index].name}}</h5>

                                    </v-flex>
                                    <v-flex xs12 justify-center align-center justify-start>
                                        <span>
                                        {{masterArraySearch[index].symbol}}
                                        </span>
                                        <span>
                                            {{index+1}}
                                        </span>

                                    </v-flex>
                                </v-layout>
                            </div>
                        </li>
                    </ul>

                </v-flex>
            </v-layout>

      </v-flex>
      <v-flex  class="pt-5 pl-5 pb-0 pr-5 detail_content" xs12 md7 lg7>
        <v-layout id="select_company_display" align-center style="height:100vh;" wrap>
          <v-flex>
              <img style="width:100px;" src="@/assets/Asset_Graphic.svg" alt="">
              <p class="display-0">Select a company to display data</p>
          </v-flex>
        </v-layout>
            <div id="detail_company_display">
              <v-layout wrap>
                  <v-flex xs12>
                      <h1 id="companyName_Detail"></h1>
                      <p id="symbol_Detail"></p>
                  </v-flex>
              </v-layout>
              <v-layout wrap>
                  <v-flex xs12 md6 lg6>
                      <h5>STOCK VALUE</h5>
                      <div><span class="display-1"><b id="stock_value">1.55 USD</b></span> <span id="stock_tax_value">+0.020</span></div>
                      <p id="close_Time"></p>
                  </v-flex>
                  <v-flex xs12 md6 lg6>
                      <h5>SECTOR</h5>
                      <p id="sector_Detail">SIC-7311 Services-Advertising Agencies Technology Services</p>
                  </v-flex>
              </v-layout>
              <v-layout wrap="">
                <v-flex xs12>
                  <!-- <Grafica></Grafica> -->
               
                   <v-simple-table  fixed-header height="65vh">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Volume</th>
                          <th class="text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in infoTable" :key="index">
                          <td>{{ infoTable[index].volume }}</td>
                          <td>{{ infoTable[index].label }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>

                  
                </v-flex>
              </v-layout>
            </div>
      </v-flex>
    </v-layout>



  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import { Bar } from 'vue-chartjs'
import Grafica from '../components/Grafica.vue'
import { mapMutations } from 'vuex'

export default {
  extends:Bar,
  name: 'home',
  data(){
    return{
       symbolsArray: [],
       infoTable: [],
       masterArrayActive: [],
       masterArrayGain: [],
       masterArraySearch: [],
       busqueda: '',
       flag: false
    }
  },
  components:{
    Grafica
  },
      methods:{
        
        show_gain_companies(){
          document.getElementById('gain_companies_ul').classList.add('active_ui');
          document.getElementById('gain_companies_ul').classList.remove('desactive_ui');
          
          document.getElementById('active_companies_ul').classList.add('desactive_ui');
          document.getElementById('active_companies_ul').classList.remove('active_ui');

          document.getElementById('tap_gain_companies').classList.add('active_tap');
          document.getElementById('tap_active_companies').classList.remove('active_tap');
          
          document.getElementById('search_companies_ul').classList.remove('active_ui');
          document.getElementById('search_companies_ul').classList.add('desactive_ui');


        },
        show_active_companies(){
          document.getElementById('gain_companies_ul').classList.add('desactive_ui');
          document.getElementById('gain_companies_ul').classList.remove('active_ui');

          document.getElementById('active_companies_ul').classList.add('active_ui');
          document.getElementById('active_companies_ul').classList.remove('desactive_ui');
          
          document.getElementById('tap_gain_companies').classList.remove('active_tap');
          document.getElementById('tap_active_companies').classList.add('active_tap');
          
          document.getElementById('search_companies_ul').classList.remove('active_ui');
          document.getElementById('search_companies_ul').classList.add('desactive_ui');

        },
        async search_method(){
          let searchArraySuggest = []
          let searchElement =[]
          this.masterArraySearch = []

          try{
            this.flag = true
            searchArraySuggest = await axios.get('https://sandbox.iexapis.com/stable/search/' + this.busqueda + '?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')
            console.log(searchArraySuggest.data.length)

            for(let i = 0; i<= searchArraySuggest.data.length - 1; i++){
            searchElement = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ searchArraySuggest.data[i].symbol+'/book?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')
            console.log(searchElement)
            this.masterArraySearch.push({
                name: searchElement.data.quote.companyName,
                symbol : searchElement.data.quote.symbol,
                closeTime : searchElement.data.quote.closeTime,
              })
            }

            document.getElementById('gain_companies_ul').classList.add('desactive_ui');
            document.getElementById('gain_companies_ul').classList.remove('active_ui');
            document.getElementById('active_companies_ul').classList.add('desactive_ui');
            document.getElementById('active_companies_ul').classList.remove('active_ui');
            document.getElementById('search_companies_ul').classList.add('active_ui');
            document.getElementById('search_companies_ul').classList.remove('desactive_ui');
          
            document.getElementById('tap_gain_companies').classList.remove('active_tap');
            document.getElementById('tap_active_companies').classList.add('active_tap');
            

          }
          catch(error){
            console.log(error)
          }
          finally{
            this.flag = false
          }
          console.log(this.masterArraySearch)
        },
        async refreshDetail(i, arrayListado){
          console.log('update')
          console.log(arrayListado)
          let tableInfo = []
          let sector = ''

          
          try{
              this.flag = true
              document.getElementById('select_company_display').classList.add('desactive_ui');
              document.getElementById('detail_company_display').classList.add('active_ui');

              document.getElementById('companyName_Detail').textContent = arrayListado[i].name;
              document.getElementById('symbol_Detail').textContent = arrayListado[i].symbol;

              if(arrayListado[i].closeTime === null){
                  document.getElementById('close_Time').textContent = "Not close Time";
              }else{
                  document.getElementById('close_Time').textContent = arrayListado[i].closeTime;
              }
              
              tableInfo = await axios.get('https://sandbox.iexapis.com/stable/stock/twtr/chart/max?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')
              this.infoTable = tableInfo.data
              console.log("tableInfo: ")
              console.log(tableInfo)

              sector = await axios.get('https://sandbox.iexapis.com/stable/stock/'+arrayListado[i].symbol+'/company?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb&filter=sector')
              console.log("sector: ")
              console.log(sector)

              document.getElementById('sector_Detail').textContent = sector.data.sector;
              //document.getElementById('stock_value').textContent = this.topSymbolsArray[0].stockValue;
              //document.getElementById('stock_tax_value').textContent = (this.topSymbolsArray[0].stockValue*0.05)+' '+ this.topSymbolsArray[0].currency
          }catch(error){
            console.log(error)
          }finally{
            this.flag = false
          }

        },
        async getSymbolsInfo(){
          
                //method vars
                let InfoCompany = []
                let mostActive = []
                let mostGain = []
                    
                  try{
                    this.flag = true
                    mostActive = await axios.get('https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                    mostGain = await axios.get('https://sandbox.iexapis.com/stable/stock/market/list/gainers?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')

                      //top gains fill array
                      for(let i = 0; i<= 10; i++){

                        if(i<=7){
                          this.masterArrayGain.push({
                            name : mostGain.data[i].companyName,
                            symbol : mostGain.data[i].symbol,
                            closeTime : mostGain.data[i].closeTime,
                          })
                        }
                        //top actives fill array
                        this.masterArrayActive.push({
                          name : mostActive.data[i].companyName,
                          symbol : mostActive.data[i].symbol,
                          closeTime : mostActive.data[i].closeTime,
                        })
                      }
                  
                  }catch(error){
                    console.log(error)
                  }finally{
                    this.flag = false
                  }
                },

        },
    created(){
        this.getSymbolsInfo()
        this.masterArrayTemporal = this.masterArrayActive


    },


}
</script>

<style scoop>
.detail_list_row{
display:flex;
flex-direction: row;
  
  background-color:white;
  border: 1px solid #dddddd;
  padding:25px;
  width:100%;
 
}
.textfield_search{
  background-color:white;
  display:flex;
  padding:10px 10px;
  border-radius: 35px;
  justify-content:flex-start;
  align-content: center;
  margin-bottom:20px;
  
}
.textfield_search input{
  outline: none;
  width:100%;
  color:Grey;
  font-size:14px;
  

}
.textfield_search img{
  width:20px;
  cursor:pointer;
}

.textfield_search img:hover{
  opacity: .5;
}
  #active_companies_ul{
    display:none;
  }
 #detail_company_display{
   display:none;
 }
  .active_ui{
    display:block !important;
  }
  .desactive_ui{
    display:none !important;
  }

.table_row{
  box-shadow: 0px -5px 12px rgb(230, 230, 230);
}
.table_row:hover{
  background-color:rgb(243, 243, 243);
  cursor:pointer;
}

.detail_content{
  background-color:rgb(243, 243, 243);
  height:100vh;
}

#tap_gain_companies:hover{
   background-color:rgb(202, 202, 202);
  color:white;
  font-weight: bold;
}
#tap_active_companies:hover{
   background-color:rgb(202, 202, 202);
  color:white;
  font-weight: bold;
}
#tap_gain_companies{
  cursor:pointer;
  background-color:rgb(243, 243, 243);
  border-radius: 0px 0px 10px 0px;
  z-index: 1;
}
#tap_active_companies{
  cursor:pointer;
  background-color:rgb(243, 243, 243);
  border-radius: 0px 0px 0px 10px;
  z-index: 1;
}
.active_tap{
  background-color:grey !important;
  color:white;
  font-weight: bold;
}
</style>