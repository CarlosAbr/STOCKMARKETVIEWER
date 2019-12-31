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
      <v-flex xs12 md3 lg3 class="secondary" style="display:flex; justify-content:center; align-items:center;" >
        <img id="logo_vertical" style="height:10vh;" src="@/assets/Asset_Logo_vertical.svg" alt="">
        <img id="logo_horizontal" style="height:10vh;" src="@/assets/Asset_Logo_Horizontal.svg" alt="">
      </v-flex>
      <v-flex xs12 md3 lg3 id="companies_list_containers">
            <v-layout class="pt-5 pl-5 pb-0 pr-5 list_content info"  justify-center align-center wrap>
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
            <!-- List of companies -->
            <v-layout justify-center>
                <v-flex>
                    <ul id="gain_companies_ul"  style="padding: 0; list-style:none;">
                        <li @click="refreshDetail(index, masterArrayActive)" v-for="(item, index) of masterArrayActive" :key="index">
                            <div class="pt-3 pb-3 pl-4 pr-4 table_row">
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <h5>{{masterArrayActive[index].name}}</h5>

                                    </v-flex>
                                    <v-flex xs11>
                                        <span>
                                            {{masterArrayActive[index].symbol}}
                                        </span>
                                    </v-flex>
                                    <v-flex xs1>
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
                                    <v-flex xs11 justify-center align-center justify-start>
                                        <span>
                                            {{masterArrayGain[index].symbol}}
                                        </span>
                                    </v-flex>
                                    <v-flex xs1>
                                        <span>
                                          {{index+1}}
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
      <v-flex  class="pt-5 pl-5 pb-0 pr-5 detail_content accent_light" xs12 md6 lg6>
        <!-- dummy -->
        <v-layout id="select_company_display" align-center style="height:100vh;" wrap>
          <v-flex>
              <center><img style="width:8vh" src="@/assets/Asset_Graphic.svg" alt=""></center>
              <center><p class="display-0">Select a company to display data</p></center>
          </v-flex>

          <!-- Detail -->
        </v-layout>

        <!-- detail -->
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
                      <div><span class="display-1"><b id="stock_value">1.55 USD</b></span> </div>
                      <p id="close_Time"></p>
                  </v-flex>
                  <v-flex xs12 md6 lg6>
                      <h5>SECTOR</h5>
                      <p id="sector_Detail">SIC-7311 Services-Advertising Agencies Technology Services</p>
                  </v-flex>
              </v-layout>

              <!-- tabla y botones -->
              <v-layout wrap="">
                <!-- table Buttones events -->
                <v-flex xs12>
                  <v-btn @click="reloadTable(1, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>1D</v-btn>
                  <v-btn @click="reloadTable(2, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>5D</v-btn>
                  <v-btn @click="reloadTable(3, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>1M</v-btn>
                  <v-btn @click="reloadTable(4, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>6M</v-btn>
                  <v-btn @click="reloadTable(5, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>YTD</v-btn>
                  <v-btn @click="reloadTable(6, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>1Y</v-btn>
                  <v-btn @click="reloadTable(7, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>5Y</v-btn>
                  <v-btn @click="reloadTable(8, activeCompanieOnDetail)" class="ml-5 mr-5 mb-5 info_light" small>MAX</v-btn>

                </v-flex>
                <!-- Tabla -->
                <h5 style="specificTypeTable" class="ml-5 mr-5 mb-5">{{typeTable}}</h5>
                <v-flex xs12>
                  <!-- <Grafica></Grafica> -->
                  
                   <v-simple-table  fixed-header height="55vh">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Volume</th>
                          <th class="text-left">Date</th>
                          <th class="text-left">High</th>
                          <th class="text-left">Lows</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in infoTable" :key="index">
                          <td>{{ infoTable[index].volume }}</td>
                          <td>{{ infoTable[index].label }}</td>
                          <td>${{ infoTable[index].high }}</td>
                          <td>${{ infoTable[index].low }}</td>
                          
                          
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
       masterArraySearch: '',
       activeCompanieOnDetail: [],
       busqueda: '',
       typeTable:'',
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
          
          document.getElementById('tap_gain_companies').classList.remove('active_tap ');
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

            for(let i = 0; i<= searchArraySuggest.data.length - 1; i++){
            searchElement = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ searchArraySuggest.data[i].symbol+'/book?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')
            console.log(searchElement)
            this.masterArraySearch.push({
                name: searchElement.data.quote.companyName,
                symbol : searchElement.data.quote.symbol,
                closeTime : searchElement.data.quote.closeTime,
                latestPrice: searchElement.data.quote.latestPrice
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
          
        },
        async reloadTable(i, activeSymbol){
          let infoTable;
          let specificTypeTable = document.getElementById('specificTypeTable')
            switch(i){
                //1D
                case 1:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/date/20190109?chartByDay=true&token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "1 DAY"
                break;
                //5D
                case 2:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/5d?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "5 DAY"
                break;
                //1M
                case 3:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/1m?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "1 MONTH"
                break;
                //6M
                case 4:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/6m?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "6 MONTHS"
                break;
                //YTD
                case 5:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/ytd?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "CURRENT YEAR"
                break;
                //1Y
                case 6:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/1y?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "1 YEAR"
                break;
                //5Y
                case 7:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/5y?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "5 YEARS"
                break;
                //MAX
                case 8:
                  infoTable = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ activeSymbol +'/chart/max?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb');
                  this.infoTable = infoTable.data
                  this.typeTable = "MAX RANGE"
                break;
            }
        },
        async refreshDetail(i, arrayListado){
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


              sector = await axios.get('https://sandbox.iexapis.com/stable/stock/'+arrayListado[i].symbol+'/company?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb&filter=sector')

              document.getElementById('sector_Detail').textContent = sector.data.sector;
              document.getElementById('stock_value').textContent = arrayListado[i].latestPrice + "USD";
              this.activeCompanieOnDetail = arrayListado[i].symbol

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
                            latestPrice: mostGain.data[i].latestPrice
                          })
                        }
                        //top actives fill array
                        this.masterArrayActive.push({
                          name : mostActive.data[i].companyName,
                          symbol : mostActive.data[i].symbol,
                          closeTime : mostActive.data[i].closeTime,
                          latestPrice: mostGain.data[i].latestPrice
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


  #logo_vertical{
    display:flex;
  }
  #logo_horizontal{
    display:none;
    height:5vh;
    margin:3vh;
  }

@media (max-width:960px) {
  #logo_vertical{
    display:none !important;
  }
  #logo_horizontal{
    display:flex !important;
  }
}

@media (flex-width:900px) and (min-width: 600px) {

  
  #gain_companies_ul,
  #active_companies_ul,
  #search_companies_ul{
    columns:2;
  }

  ul li{
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  #companies_list_containers{
    height:100% !important;
    overflow-y:scroll;
  }

}

#companies_list_containers{
    height:100vh;
    overflow-y:scroll;
  }

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