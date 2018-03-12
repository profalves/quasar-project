<template>
  <div>
      <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
      </q-fixed-position>
      
      <div class="row">
        <div class="col-xl-6">
          <q-list inset-separator style="background-color: white; margin-bottom: 40px;">
            <q-list-header>Configurações Gerais</q-list-header>
            
            <!-- DASHBOARD -->
            <q-collapsible icon="fa-tachometer" label="Painel de Abertura" sublabel="Configurações de exibição do painel inicial">
              <q-list highlight no-border>
                <q-list-header>Menu</q-list-header>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Exibir Icones do Menu Principal</q-item-tile>
                    <q-item-tile sublabel lines="2">Permitir acessar o menu principal através do painel inicial</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="menu"
                        checked-icon="visibility"
                        unchecked-icon="visibility_off"
                        style="margin-left: 25px"
                        @change="menuVisibility"
                    />

                  </q-item-side>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Exibir botão de configurações no Menu Principal</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="configBtn"
                        checked-icon="visibility"
                        unchecked-icon="visibility_off"
                        style="margin-left: 25px"
                        @change="configVisibility"
                    />

                  </q-item-side>
                </q-item>
                <q-item-separator />
                <q-list-header>Vendas</q-list-header>
                <q-item>
                  <q-checkbox v-model="expandVendas" label="Trazer expandido" @change="expVendas" />
                </q-item>
                <div style="margin-left: 15px">
                  <strong>Configuração da Exibição dos Relógios (Gauges)</strong>
                </div>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Meta do Dia Padrão</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="metaDia" 
                             type="number" 
                             align="right"
                             @change="setMetaDia"
                             @blur="calcMetaDia"
                             />
                  </q-item-side>
                </q-item>
                <q-item>
                  <q-item-side >
                    <i class="ion-record text-warning" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Notificar com esta cor quando...</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="qdPerc" 
                         suffix="%"
                         type="number"
                         align="right"
                         @change="calcQuaseDia"
                         @blur="calcQuaseDia"
                         />
                    <q-input v-model="quaseDia" 
                         float-label="Valor acima de"
                         type="number" 
                         align="right"
                         @change="setQuaseDia"
                         @blur="setPercQuaseDia"
                         /> 
                  </q-item-side>
                </q-item>
                <q-item>
                  <q-item-side >
                    <i class="ion-record text-positive" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Notificar com esta cor a quando...</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="tdPerc" 
                       suffix="%"
                       type="number"
                       align="right"
                       @change="calcTetoDia"
                       @blur="calcTetoDia"
                       />
                    <q-input v-model="tetoDia" 
                       float-label="Até"
                       type="number" 
                       align="right"
                       @change="setTetoDia"
                       @blur="setPercTetoDia"
                       />
                  </q-item-side>
                </q-item>
                <q-item-separator />
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Meta do Mês Padrão</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="metaMes" 
                             type="number" 
                             align="right"
                             @change="setMetaMes"
                             @blur="calcMetaMes"
                             />
                  </q-item-side>
                </q-item>
                <q-item>
                  <q-item-side >
                    <i class="ion-record text-warning" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Quase Meta do Mês Padrão</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="qmPerc" 
                         suffix="%"
                         type="number"
                         align="right"
                         @change="calcQuaseMes"
                         @blur="calcQuaseMes"
                         />
                    <q-input v-model="quaseMes" 
                         float-label="Valor acima de"
                         type="number" 
                         align="right"
                         @change="setQuaseMes"
                         @blur="setPercQuaseMes"
                         />
                  </q-item-side>
                </q-item>
                <q-item>
                  <q-item-side >
                    <i class="ion-record text-positive" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Notificar com esta cor quando...</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="tmPerc" 
                       suffix="%"
                       type="number"
                       align="right"
                       @change="calcTetoMes"
                       @blur="calcTetoMes"
                       />
                    <q-input v-model="tetoMes" 
                       float-label="Até"
                       type="number" 
                       align="right"
                       @change="setTetoMes"
                       @blur="setPercTetoMes"
                       />
                  </q-item-side>
                </q-item>
                <div ref="quase">
                  <q-chip tag closable color="warning" @close="$refs.quase.remove()">
                    <i>AMARELO: Escolher um resultado que pode ser considerado como o que for abaixo desse será marcado com a cor vermelha no painel. Acima dele ficará amarelo até atingir a meta</i>
                  </q-chip>
                </div>
                <div ref="teto">
                  <q-chip tag closable color="positive" @close="$refs.teto.remove()">
                    <i>VERDE: Escolher um resultado que pode ser considerado um resultado máximo onde permite o painel ficar verde e ainda mostrando o resultado depois que a meta for atingida. Por padrão, será a metade do dobro da meta</i>
                  </q-chip>
                </div>
                <q-item-separator />
                <div style="margin-left: 15px">
                  <strong>Vendedor</strong>
                </div>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Meta do Mês Padrão</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="metaMesVendedor" 
                             type="number" 
                             align="right"
                             @change="setMetaMesVendedor"
                             />
                  </q-item-side>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Meta do Dia Padrão</q-item-tile>
                    <q-item-tile sublabel>
                      <q-btn color="primary"
                             small rounded
                             @click="sugerir"
                             >Sugerir</q-btn>
                    </q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-input v-model="metaDiaVendedor" 
                             type="number" 
                             align="right"
                             @change="setMetaDiaVendedor"
                             />
                  </q-item-side>
                </q-item>
                <div ref="info">
                  <q-chip tag closable color="info" @close="$refs.info.remove()">
                    <i>Sugerir a meta diária: Ao clicar no botão sugerir, ele calcula a meta do mês dividido pela jornada mensal de trabalho, normalmente 25 dias.</i>
                  </q-chip>
                </div>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Meta editável</q-item-tile>
                    <q-item-tile sublabel lines="2">Permite editar a meta no próprio painel de vendas</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-checkbox v-model="editMeta"
                                @change="setEditMeta"/>
                  </q-item-side>
                </q-item>
                <q-item-separator />
                <q-list-header>Contas</q-list-header>
                <q-item>
                  <q-checkbox v-model="expandContas" label="Trazer expandido" @change="expContas" />
                </q-item>
                <q-item-separator />
                <q-list-header>Estoque Mínimo</q-list-header>
                <q-item>
                  <q-checkbox v-model="expandEstoque" label="Trazer expandido" @change="expEstoque" />
                </q-item>
                <q-item-separator />
                <q-list-header>Aniversários</q-list-header>
                <q-item>
                  <q-checkbox v-model="expandNivers" label="Trazer expandido" @change="expNivers" />
                </q-item>
              </q-list>
              
            </q-collapsible>
            <!-- Notificações --
            <q-collapsible icon="notifications" label="Notificações" sublabel="Configurações de exibição de Notificações no sistema">
              <div>
               <q-list link no-border>
                <q-item multiline tag="label">
                  <q-item-main>
                    <q-item-tile label>Receber Notificações</q-item-tile>
                    <q-item-tile sublabel lines="2">Solicitar permissão para receber Notificações no app</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-btn round 
                           push
                           @click="solicitarNotificacoes">
                        <i class="fa fa-exclamation text-primary"></i>
                    </q-btn>
                  </q-item-side>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                      <q-icon name="fa-sign-in fa-2x" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile title>Boas Vindas</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="boas"
                        checked-icon="visibility"
                        unchecked-icon="visibility_off"
                        style="margin-left: 25px"
                        @change="notificaBoasVindas"
                    />

                  </q-item-side>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                      <q-icon name="fa-birthday-cake fa-2x" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Aniversariantes</q-item-tile>
                    <q-item-tile sublabel>Receberá notificações se houver aniversariantes no dia</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="niver"
                        checked-icon="visibility"
                        unchecked-icon="visibility_off"
                        style="margin-left: 25px"
                        @change="notificaAniversariantes"
                    />
                  </q-item-side>
                </q-item>
                
               </q-list>
                 
              </div>
            </q-collapsible>-->
            <!-- BUSCAS -->
            <q-collapsible icon="search" label="Buscas" sublabel="Configurações de buscas (Pessoas e Produtos)">
                <q-list link no-border>
                    <q-item multiline tag="label">
                      <q-item-main>
                        <q-item-tile label>Permitir autocompletar a pesquisa</q-item-tile>
                        <q-item-tile sublabel lines="2">Exibir uma lista prévia de resultados conforme o que foi digitado na pesquisa</q-item-tile>
                      </q-item-main>
                      <q-item-side right>
                        <q-checkbox v-model="autocomplete"
                                    @change="setAutoComplete"/>
                      </q-item-side>
                    </q-item>
                    <q-item multiline tag="label">
                      <q-item-main>
                        <q-item-tile label>Número máximo de resultados</q-item-tile>
                        <q-item-tile sublabel lines="2">Quantidade máxima de resultados exibidos durante o autocompletar da busca</q-item-tile>
                      </q-item-main>
                      <q-item-side right>
                        <q-input v-model="maxResults" 
                                 type="number" 
                                 :min="0" 
                                 :max="20" 
                                 align="right"
                                 @change="setMaxResults"/> 
                      </q-item-side>
                    </q-item>
                </q-list>
            </q-collapsible>
            <!-- GRAFICOS -->
            <q-collapsible icon="insert_chart" label="Configuações de Gráficos" sublabel="Configurações de exibição de gráficos no sistema">
              <div>
               <q-field label="Tipo de Gráfico a Exibir">
                <q-select
                      v-model="tipoGrafico"
                      class="col-xs-6 col-sm"
                      @change="alterarGrafico"
                      :options="[
                        {
                          label: 'Linha',
                          icon: 'show_chart',
                          value: 'line'
                        },
                        {
                          label: 'Barra',
                          icon: 'insert_chart',
                          value: 'bar'
                        },
                        {
                          label: 'Pizza',
                          icon: 'pie_chart',
                          value: 'pie'
                        },
                        {
                          label: 'Donut',
                          icon: 'donut_large',
                          value: 'donut'
                        },
                       ]"/>
                 </q-field>
                 <p class="caption">
                    Altura
                 </p>
                 <q-slider :label-value="`${height}px`" v-model="height" :min="10" :max="600" :step="10" label-always color="teal" @change="alterarTamGrafico" />
                 
              </div>
            </q-collapsible>
            <!-- LISTAS -->
            <q-collapsible icon="view_list" label="Listas" sublabel="Configure globalmente a exibição das listas">
              <div>
                  <q-field
                    icon="widgets"
                    label="Recursos"
                    :label-width="4"
                  >
                    <div class="column group" style="margin: -5px -7px">
                      <q-checkbox v-model="config.refresh" label="Atualizar tabela (refresh)" />
                      <q-checkbox v-model="config.columnPicker" label="Selecionar colunas" />
                      <q-checkbox v-model="pagination" label="Paginação" />
                      <q-checkbox v-model="config.responsive" label="Responsiva" />
                      <q-checkbox v-model="config.noHeader" label="Sem Cabeçário" />
                    </div>
                  </q-field>

                  <q-field
                    icon="check box"
                    label="Tipo de Seleção"
                    :label-width="4"
                  >
                    <q-select
                      v-model="config.selection"
                      class="col-xs-12 col-sm"
                      float-label="Seleção"
                      :options="[
                        {label: 'Nenhuma', value: 'none'},
                        {label: 'Singular', value: 'single'},
                        {label: 'Multipla', value: 'multiple'}
                      ]"
                    />
                  </q-field>

                  <q-field
                    icon="format_line_spacing"
                    label="Altura das linhas"
                    :label-width="4"
                  >
                    <q-slider v-model="rowHeight" :min="38" :max="200" label-always :label-value="`${rowHeight}px` "/>
                  </q-field>

                  <q-field
                    icon="format_list_numbered"
                    label="Linhas por Página"
                    :label-width="4"
                  >
                    <q-slider v-model="rowsPerPage" :min="5" :max="500" :step="5" label-always :label-value="`${rowsPerPage} Linhas` "/>
                  </q-field>

                  <q-field
                    icon="content_paste"
                    label="Tamanho"
                    :label-width="4"
                  >
                    <div class="row no-wrap items-center">
                      <div class="col-auto" style="margin-top: 10px">
                        <q-select
                          v-model="bodyHeightProp"
                          float-label="Tipo"
                          :options="[
                            {label: 'Auto', value: 'auto'},
                            {label: 'Altura', value: 'height'},
                            {label: 'Altura Min', value: 'minHeight'},
                            {label: 'Altura Max', value: 'maxHeight'}
                          ]"
                        />
                      </div>
                      <q-slider class="col" v-model="bodyHeight" :min="100" :max="700" label-always :disable="bodyHeightProp === 'auto'" :label-value="`${bodyHeight}px`" />
                    </div>
                  </q-field>

                  <!--Salvar-->
                  <div class="row">
                    <q-btn icon="done"
                           color="primary"
                           @click="salvarConfig"
                           style="margin: 10px;"
                    >Salvar</q-btn>

                    <q-btn icon="refresh"
                           color="primary"
                           @click="alertReset"
                           style="margin: 10px;"
                    >Resetar</q-btn>

                  </div>


              </div>
            </q-collapsible>
            <!-- WhatsApp --
            <q-collapsible icon="fa-whatsapp" label="WhatsApp" sublabel="Configure as mensagens prontas para enviar para as listas de transmissão cadastradas no celular"></q-collapsible> -->
            <!-- FOTO USUÁRIO -->
            <q-collapsible icon="fa-id-badge" :opened="configFoto" label="Foto Pessoal" sublabel="Insira sua foto de identificação">
              <div class="text-center">
                <div class="fileUpload" v-if="!image">
                    <span>Selecione uma imagem</span>
                    <input type="file" class="upload" @change="onFileChange" />
                </div>
                <div v-else>
                  <img :src="image" class="avatar" /><br>
                  <q-btn color="primary" rounded @click="removeImage">Remover imagem</q-btn>
                </div>
              </div>
            </q-collapsible>
            <!-- BANCOS -->
            <q-collapsible  icon="device_hub" 
                            label="Banco de Dados" 
                            sublabel="Configure a Empresa ao qual deseja conectar"
                            :opened="bdConfig"
                            >
              <p ref="chip">
                <q-chip tag closable color="black" @close="$refs.chip.remove()"><i>Para salvar um banco, o mesmo deve ser digitado e depois clicar no botão adicionar(+)</i></q-chip>
              </p>
              <div class="row">
                <div class="col">
                  <q-field
                    icon="domain"
                    helper="Nome da Empresa"
                  >
                    <q-input v-model.trim="empresa" clearable />
                  </q-field>   
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <q-field
                    icon="pin_drop"
                    helper="IP/Host"
                  >
                    <q-input v-model.trim="ip" clearable/>
                  </q-field>   
                </div>
                <div class="col-md-6">
                  <q-field
                    icon="pin_drop"
                    helper="Porta"
                  >
                    <q-input v-model.number="porta" 
                             type="number"
                             v-mask="['#####']"
                             clearable/>
                  </q-field>   
                </div>    
              </div> 
              <div class="row">
                <div class="col">
                  <q-field
                    icon="fa-server"
                    helper="Web Service"
                  >
                    <q-input v-model.trim="banco" clearable />
                  </q-field>   
                </div>
              </div>
              <div class="row">
                <!--<div class="col">
                  <q-field
                    icon="featured_play_list"
                    helper="Nome do Banco de Dados"
                  >
                    <q-input v-model.trim="bdName" clearable />
                  </q-field>   
                </div>
                <div class="col">
                  <q-field
                    icon="vpn_key"
                    helper="Senha do Banco de Dados"
                  >
                    <q-input v-model.trim="senhaBd" type="password" clearable />
                  </q-field>   
                </div> -->
                <div class="col-2" id="btn-save">
                    <q-btn 
                       rounded
                       color="primary" 
                       @click="salvarBanco">
                       Salvar
                    </q-btn>
                </div>
              </div>
              <br>
              Bancos de Dados salvos: <br><br>

            <div class="row" id="config">    
                <table class="q-table" :class="computedClasses" style="width: 100%">
                  <thead>
                    <tr>
                      <th class="text-left">ID</th>
                      <th class="text-left">Empresa</th>
                      <th class="text-left">Web Service</th>
                      <th class="text-left">IP/Host</th>
                      <th class="text-left">Porta</th>
                      <th class="text-left">Editar</th>
                      <th class="text-left">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in bancosDados">
                      <td class="text-left">{{ item.IdBanco }}</td>
                      <td class="text-left">{{ item.empresa }}</td>
                      <td class="text-left">{{ item.banco }}</td>
                      <td class="text-left">{{ item.ip }}</td>
                      <td class="text-left">{{ item.porta }}</td>
                      <td class="text-center">
                        <a @click="editar(item)" color="info"><i class="material-icons fa-2x" >mode_edit</i></a>   
                      </td>
                      <td class="text-center">
                        <i class="material-icons fa-2x mHover text-negative" @click="excluir(item, index)" color="negative">delete_forever</i> 
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>

            </q-collapsible>
            <!-- SYNC -->
            <q-collapsible icon="sync" label="Sincronizar o Aplicativo" sublabel="Configure a sincronização em tempo real e executar um sincronização agora">
              <div>
               <q-list link no-border>
                <q-item multiline tag="label">
                  <q-item-main>
                    <q-item-tile label>Sincronizar agora</q-item-tile>
                    <q-item-tile sublabel>Solicitar sincronização completa do app</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-btn loader
                           push
                           round
                           class="text-secondary"
                           @click="syncStart">
                      <i class="material-icons fa-2x">sync</i>
                    </q-btn>
                  </q-item-side>
                </q-item>
                <q-list-header>Sincronizar Automaticamente Durante o Uso</q-list-header>
                <q-item tag="label">
                  <q-item-side>
                      <q-icon name="fa-users" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile title>Pessoas</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="loadPessoas"
                        checked-icon="sync"
                        unchecked-icon="sync_disabled"
                        style="margin-left: 25px"
                        @change="setLoadPessoas"
                    />

                  </q-item-side>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                      <q-icon name="fa-shopping-cart" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Produtos</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="loadProdutos"
                        checked-icon="sync"
                        unchecked-icon="sync_disabled"
                        style="margin-left: 25px"
                        @change="setLoadProdutos"
                    />
                  </q-item-side>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                      <q-icon name="fa-money" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Contas</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="loadContas"
                        checked-icon="sync"
                        unchecked-icon="sync_disabled"
                        style="margin-left: 25px"
                        @change="setLoadContas"
                    />
                  </q-item-side>
                </q-item>
                <q-item tag="label">
                  <q-item-side>
                      <q-icon name="fa-user" />
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile label>Usuários</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle
                        v-model="loadUsuarios"
                        checked-icon="sync"
                        unchecked-icon="sync_disabled"
                        style="margin-left: 25px"
                        @change="setLoadUsuarios"
                    />
                  </q-item-side>
                </q-item>
                
               </q-list>
                 
              </div>
            </q-collapsible>
            <!-- ARMAZENAMENTO INTERNO -->
            <q-collapsible icon="smartphone" label="Armazenamento Interno" sublabel="Visualizar o armazenamento do aplicativo em uso agora">
                <q-list link no-border>
                    <q-item multiline tag="label">
                      <q-item-main>
                        <q-item-tile label>SQLite</q-item-tile>
                        <q-item-tile sublabel>{{dbLocal}}</q-item-tile>
                      </q-item-main>

                    </q-item>
                    <q-item multiline tag="label">
                      <q-item-main>
                        <q-item-tile label>Local Storage (Browser/Webview)</q-item-tile>
                        <q-item-tile sublabel>{{localStorage}}</q-item-tile>
                      </q-item-main>

                    </q-item>
                </q-list>
            </q-collapsible>
            <!-- RESET -->
            <q-collapsible  icon="delete_forever" 
                            label="Restaurar Configurações de Fábrica" 
                            sublabel="Resetar todas as configurações">
                <q-btn
                    color="negative"
                    icon="warning"
                    @click="resetarTudo"
                    style="margin-left: 48px"
                >Resetar Tudo</q-btn>    
                                
            </q-collapsible>
          </q-list>
      </div>
    </div>
    <br><br><br>
    
  </div>
</template>

<script>
import { Toast, Dialog, Loading } from 'quasar'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import localforage from 'localforage'
import axios from 'axios'
  
let API = localStorage.getItem('wsAtual')

export default {
  data () {
    return {
      //btn voltar
      canGoBack: window.history.length > 1,
      
      //dashboard
      menu: (localStorage.getItem('menu') === 'true'),
      configBtn: (localStorage.getItem('configBtn') === 'true'),
      metaDiaVendedor: parseInt(localStorage.getItem('metaDiaVendedor')),
      metaMesVendedor: parseInt(localStorage.getItem('metaMesVendedor')),
      editMeta: (localStorage.getItem('editMeta') === 'true'),
      metaDia: parseInt(localStorage.getItem('metaDia')),
      qdPerc: parseInt(localStorage.getItem('qdPerc')),
      quaseDia: parseInt(localStorage.getItem('quaseDia')),
      tdPerc: parseInt(localStorage.getItem('tdPerc')),
      tetoDia: parseInt(localStorage.getItem('tetoDia')),
      metaMes: parseInt(localStorage.getItem('metaMes')),
      qmPerc: parseInt(localStorage.getItem('qmPerc')),
      quaseMes: parseInt(localStorage.getItem('quaseMes')),
      tmPerc: parseInt(localStorage.getItem('tmPerc')),
      tetoMes: parseInt(localStorage.getItem('tetoMes')),
      expandVendas: (localStorage.getItem('expandVendas') === 'true'),
      expandContas: (localStorage.getItem('expandContas') === 'true'),
      expandEstoque: (localStorage.getItem('expandEstoque') === 'true'),
      expandNivers: (localStorage.getItem('expandNivers') === 'true'),
      
      //buscas
      maxResults: parseInt(localStorage.getItem('maxResults')),
      autocomplete: (localStorage.getItem('autocomplete') === 'true'),
      
      //Notificações
      boas: (localStorage.getItem('boasVindas') === 'true'),
      niver: (localStorage.getItem('aniversarios') === 'true'),    
      list: false,    
        
      //Graficos
      tipoGrafico: localStorage.getItem('tipoGrafico'),
      height: parseInt(localStorage.getItem('alturaGrafico')),
      check: false,
      
      //config. das tabelas
      config: { 
        refresh: (localStorage.getItem('refresh') === 'true'),
        noHeader: (localStorage.getItem('noHeader') === 'true'),
        columnPicker: (localStorage.getItem('columnPicker') === 'true'),
        responsive: (localStorage.getItem('responsive') === 'true'),
        selection: localStorage.getItem('selection')
      },
      pagination: (localStorage.getItem('pagination') === 'true'),
      rowsPerPage: parseInt(localStorage.getItem('rowsPerPage')),
      rowHeight: parseInt(localStorage.getItem('rowHeight')),
      bodyHeightProp: localStorage.getItem('bodyHeightProp'),
      bodyHeight: parseInt(localStorage.getItem('bodyHeight')),
      
      //foto
      image: localStorage.getItem('foto'),
      local: '',
      configFoto: false,
      
      // config. Banco de Dados
      empresa: '',
      ip: '',
      porta: '',
      banco: '',
      senhaBd: '',
      bancoID: '',
      bdName: '',
      bancosDados: [],
      filtro: '',
      indice: '',
      edit: false,
      bdConfig: false,
        
      //tabela
      misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
      separator: 'cell', // none, horizontal, vertical, cell
      stripe: 'odd', // none, odd, even
      type: 'none', // flipped, responsive
      gutter: 'none', // compact, loose
      
      //Armazenamento internoget 
      localStorage: '',
      dbLocal: '',
        
      //sync
      loadPessoas: (localStorage.getItem('loadPessoas') === 'true'),
      loadProdutos: (localStorage.getItem('loadProdutos') === 'true'),
      loadContas: (localStorage.getItem('loadContas') === 'true'),
      loadUsuarios: (localStorage.getItem('loadUsuarios') === 'true'),
      syncCount: 0,
      
    }
  },
    
  computed: {
    computedClasses () {
      let classes = []
      if (this.misc.includes('bordered')) {
        classes.push('bordered')
      }
      if (this.misc.includes('highlight')) {
        classes.push('highlight')
      }
      if (this.separator !== 'none') {
        classes.push(this.separator + '-separator')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    },
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    
    //dashboard
    menuVisibility(){
      localStorage.setItem('menu', this.menu)  
    },
    configVisibility(){
      localStorage.setItem('configBtn', this.configBtn)  
    },
    //===============================
    sugerir(){
      this.metaDiaVendedor = Math.round(this.metaMesVendedor / 25)
      localStorage.setItem('metaDiaVendedor', this.metaDiaVendedor)
    },
    setMetaDiaVendedor(){
      localStorage.setItem('metaDiaVendedor', this.metaDiaVendedor)
    },
    setMetaMesVendedor(){
      localStorage.setItem('metaMesVendedor', this.metaMesVendedor)
    },
    setEditMeta(){
      localStorage.setItem('editMeta', this.editMeta)
    },
    setMetaDia(){
      localStorage.setItem('metaDia', this.metaDia)  
    },
    calcMetaDia(){
      this.calcQuaseDia()
      this.setPercQuaseDia()
      this.calcTetoDia()
      this.setPercTetoDia()
    },
    calcQuaseDia(){
      let perc = (this.qdPerc/100)*this.metaDia
      this.quaseDia = Math.round(perc)
      localStorage.setItem('quaseDia', this.quaseDia)  
      localStorage.setItem('qdPerc', this.qdPerc)  
    },
    setQuaseDia(){
      localStorage.setItem('quaseDia', this.quaseDia)  
    },
    setPercQuaseDia(){
      this.qdPerc = Math.round((this.quaseDia/this.metaDia)*100)
      localStorage.setItem('qdPerc', this.qdPerc);
    },
    calcTetoDia(){
      let perc = (this.tdPerc/100)*this.metaDia
      this.tetoDia = (Math.round(perc))+this.metaDia
      localStorage.setItem('tetoDia', this.tetoDia)  
      localStorage.setItem('tdPerc', this.tdPerc)  
    },
    setTetoDia(){
      localStorage.setItem('tetoDia', this.tetoDia)  
    },
    setPercTetoDia(){
      this.tdPerc = Math.round(((this.tetoDia/this.metaDia)*100)/2)
      localStorage.setItem('tdPerc', this.tdPerc);
    },
    setMetaMes(){
      localStorage.setItem('metaMes', this.metaMes)  
    },
    calcMetaMes(){
      this.calcQuaseMes()
      this.setPercQuaseMes()
      this.calcTetoMes()
      this.setPercTetoMes()
    },
    calcQuaseMes(){
      let perc = (this.qmPerc/100)*this.metaMes
      this.quaseMes = Math.round(perc)
      localStorage.setItem('quaseMes', this.quaseMes)  
      localStorage.setItem('qmPerc', this.qmPerc)  
    },
    setQuaseMes(){
      localStorage.setItem('quaseMes', this.quaseMes)  
    },
    setPercQuaseMes(){
      this.qmPerc = Math.round((this.quaseMes/this.metaMes)*100)
      localStorage.setItem('qmPerc', this.qmPerc);
    },
    calcTetoMes(){
      let perc = (this.tmPerc/100)*this.metaMes
      this.tetoMes = (Math.round(perc))+this.metaMes
      localStorage.setItem('tetoMes', this.tetoMes)
      localStorage.setItem('tmPerc', this.tmPerc)
    },
    setTetoMes(){
      localStorage.setItem('tetoMes', this.tetoMes)  
    },
    setPercTetoMes(){
      this.tmPerc = Math.round(((this.tetoMes/this.metaMes)*100)/2)
      localStorage.setItem('tmPerc', this.tmPerc);
    },
    expVendas(){
      localStorage.setItem('expandVendas', this.expandVendas)
    },
    expContas(){
      localStorage.setItem('expandContas', this.expandContas)
    },
    expEstoque(){
      localStorage.setItem('expandEstoque', this.expandEstoque)
    },
    expNivers(){
      localStorage.setItem('expandNivers', this.expandNivers)
    },
    
    //notificações
    solicitarNotificacoes(){
        if (!("Notification" in window)) {
            alert("This device does not support notification");
        }
        else if (Notification.permission === "granted") {
            return new Notification("Você tem permissão para receber notificações");
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied' || Notification.permission === "default") {
          Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                return new Notification("Permissão para receber notificações concedida");
              }
          });
        }

    },
    notificaBoasVindas(){
        localStorage.setItem('boasVindas', this.boas)
    },
    notificaAniversariantes(){
        localStorage.setItem('aniversarios', this.niver)
    },
      
    //buscas
    setMaxResults(){
      localStorage.setItem('maxResults', this.maxResults)    
    },
    setAutoComplete(){
      localStorage.setItem('autocomplete', this.autocomplete)    
    },
      
    //Graficos
    alterarGrafico(){
        localStorage.setItem('tipoGrafico', this.tipoGrafico)
    },
    alterarTamGrafico(){
        parseInt(localStorage.setItem('alturaGrafico', this.height))
    },
    
    //Listas
    salvarConfig(){
        localStorage.setItem('refresh', this.config.refresh)
        localStorage.setItem('noHeader', this.config.noHeader)
        localStorage.setItem('columnPicker', this.config.columnPicker)
        localStorage.setItem('responsive', this.config.responsive)
        localStorage.setItem('selection', this.config.selection)
        localStorage.setItem('pagination', this.pagination)
        localStorage.setItem('rowHeight', this.rowHeight)
        localStorage.setItem('bodyHeightProp', this.bodyHeightProp)
        localStorage.setItem('bodyHeight', this.bodyHeight)
        localStorage.setItem('rowsPerPage', this.rowsPerPage)
        Toast.create.positive({
            html: 'Configurações salvas com sucesso',
            icon: 'done'
        })    
    },
    resetConfig(){
        this.config.refresh = false
        this.config.noHeader = false
        this.config.columnPicker = false
        this.config.responsive = false
        this.config.selection = 'multiple'
        this.pagination = true
        this.rowHeight = 45
        this.bodyHeightProp = 'auto'
        this.bodyHeight = 200
        this.rowsPerPage = 5
        
        this.salvarConfig()
    
    },
    alertReset(){
        let t = this
        Dialog.create({
          title: 'Tem certeza que deseja voltar para as configurações iniciais de listas?',
          message: 'Depois de confirmado, esta ação não poderá ser revertida...',
          buttons: [
            {
              label: 'Não',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('NÃO RESETADO: As configurações de listas continuam as mesmas')
              }
            },
            {
              label: 'Sim',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                t.resetConfig()
                Toast.create('configurações de listas retornaram para as configurações iniciais')
              }
            }
          ]
        })
    },
    
    //fotos
    onFileChange(e) {
      console.log('evento acionado!')
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      //let image = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result
        localStorage.setItem('foto', this.image)
      };
      reader.readAsDataURL(file);
      
      
    },
    removeImage(e) {
      this.image = '';
      localStorage.setItem('foto', 'http://www.grafilino.pt/images/user60.png');
    },
    
    //Bancos
    listarBancos(){
        var i
        for (i = 1; i <= localStorage.getItem('bancoCont'); i++) {
            var lista = { 
                            IdBanco : localStorage.getItem('IdBanco' + i),
                            ip : localStorage.getItem('ip' + i),
                            porta: localStorage.getItem('porta' + i),
                            banco: localStorage.getItem('banco' + i),
                            empresa: localStorage.getItem('Empresa' + i)
                        }
            if(lista.IdBanco!==null){
                this.bancosDados.push(lista)
            }
        }

    },
    salvarBanco(){
        if(this.ip === ''){ 
            Toast.create.negative('Não pode salvar com as informações de Banco de dados vazias')
            return
        }
        if(this.edit === true){ //editar
            localStorage.setItem('Empresa' + this.filtro, this.empresa)
            localStorage.setItem('ip' + this.filtro, this.ip)
            localStorage.setItem('porta' + this.filtro, this.porta)
            localStorage.setItem('banco' + this.filtro, this.banco)
            localStorage.setItem('senhaBD' + this.filtro, this.senhaBd)
            this.empresa = ''
            this.ip = ''
            this.porta = ''
            this.banco = ''
            this.senhaBd = ''
            this.edit = false
            Toast.create.positive({
                html: 'Configurações salvas com sucesso',
                icon: 'done'
            })
            this.bancosDados = []
            this.listarBancos()
        }
        else{ //novo
            var bancoCont = parseInt(localStorage.getItem('bancoCont'))
            if(isNaN(bancoCont)) {
                bancoCont = 0
            }
            var cont = bancoCont + 1
            localStorage.setItem('bancoCont', cont)
            localStorage.setItem('IdBanco' + localStorage.getItem('bancoCont'), cont)
            localStorage.setItem('Empresa' + localStorage.getItem('bancoCont'), this.empresa)
            localStorage.setItem('ip' + localStorage.getItem('bancoCont'), this.ip)
            if(this.porta > 0){
                localStorage.setItem('porta' + localStorage.getItem('bancoCont'), this.porta)
            }
            localStorage.setItem('banco' + localStorage.getItem('bancoCont'), this.banco)
            localStorage.setItem('senhaBD' + localStorage.getItem('bancoCont'), this.senhaBd)
            this.empresa = ''
            this.ip = ''
            this.porta = ''
            this.banco = ''
            this.senhaBd = ''
            Toast.create.positive({
                html: 'Configurações salvas com sucesso',
                icon: 'done'
            })
            this.bancosDados = []
            this.listarBancos()
            
        }
    },
    setWS(){
        if(this.bancosDados.length === 1){
            let port = ''
            if(localStorage.getItem('porta1')){
                port = ':' + localStorage.getItem('porta1')     
            }
            let DB = ''
            if(localStorage.getItem('banco1')){
                DB = '/' + localStorage.getItem('banco1')     
            }
            let sv = localStorage.getItem('ip1')
            localStorage.setItem('wsAtual', 'http://' + sv + port + DB + '/' )
        }
    },
    editar(item, index) {
        this.filtro = item.IdBanco
        this.edit = true
        this.empresa = localStorage.getItem('Empresa' + this.filtro)
        this.ip = localStorage.getItem('ip' + this.filtro)
        this.porta = localStorage.getItem('porta' + this.filtro)
        this.banco = localStorage.getItem('banco' + this.filtro)
        this.senhaBd = localStorage.getItem('senhaBD' + this.filtro)
        
    },
    excluir(item, index) {
        this.filtro = item.IdBanco
        this.indice = index
        
        if(this.indice !== -1) {
            this.bancosDados.splice(index,1)
        }
        
        localStorage.removeItem('Empresa' + this.filtro)
        localStorage.removeItem('IdBanco' + this.filtro)
        localStorage.removeItem('ip' + this.filtro)
        localStorage.removeItem('porta' + this.filtro)
        localStorage.removeItem('banco' + this.filtro)
        localStorage.removeItem('senhaBD' + this.filtro)
        
        this.bancosDados = []
        this.listarBancos()
    },
    
    //Sincronizar
    setLoadPessoas(){
        localStorage.setItem('loadPessoas', this.loadPessoas)
    },
    setLoadProdutos(){
        localStorage.setItem('loadProdutos', this.loadProdutos)
    },
    setLoadContas(){
        localStorage.setItem('loadContas', this.loadContas)
    },
    setLoadUsuarios(){
        localStorage.setItem('loadUsuarios', this.loadUsuarios)
    },
    //sincronização: 
    listarUsuarios(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Carregando Usuários...'
      })

      axios.get(API + 'usuario/obterUsuario')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        localforage.setItem('Usuários', res.data)
        console.log('Usuários', res.data)
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    listarPessoas(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Obtendo Pessoas...'
      })
      axios.get(API + 'pessoa/obterpessoa?todos=true')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('Pessoas', res.data)
        localforage.setItem('Pessoas', res.data)
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
    },
    listarCidadesCadastradas(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + '/cidade/obterCidades?somentecadastradas=true')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('cidades: ', res.data)
        localforage.setItem('Cidades', res.data)
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      }) 
    },
    listarBairros(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + '/cidade/obterBairros')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('Bairros: ', res.data)
        localforage.setItem('Bairros', res.data)
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      }) 
    },
    todosProdutos(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Obtendo Produtos...'
      })
      axios.get(API + 'produto/obterproduto')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        Loading.hide()
        localforage.setItem('Produtos', res.data)
        console.log('Produtos', res.data)
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e.response)
        Toast.create({
                html: 'Sem Conexão',
                timeout: 6000,
                bgColor: '#f44242',
                icon: 'mood_bad'
            })
      })
    },
    listarFamProdutos(){
      axios.get(API + 'produto/obterProdutosFamilia')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('FamiliasProdutos', res.data)
        localforage.setItem('FamiliasProdutos', res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    listarCategorias(){
      axios.get(API + 'produto/obterProdutosCategorias')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('CategoriasProdutos', res.data)
        localforage.setItem('CategoriasProdutos', res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    listarMarcas(){
      axios.get(API + 'produto/obterProdutosMarcas')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('MarcasProdutos', res.data)
        localforage.setItem('MarcasProdutos', res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    listarDespPagar(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Obtendo Depesas a pagar...'
      })
      axios.get(API + 'conta/obterContas?tipo=cp&pagas=false')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
          console.log('DespPagar', res.data)
          localforage.setItem('DespPagar', res.data)
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
    },
    listarDespPagas(){
      let load = localStorage.getItem('loadContas')
      if(load === 'true') return
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Obtendo Depesas pagas...'
      })
      axios.get(API + 'conta/obterContas?tipo=cp&pagas=true')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
          console.log('DespPagas', res.data)
          localforage.setItem('DespPagas', res.data)
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
    },
    listarRecPagar(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Obtendo Receitas a pagar...'
      })
      axios.get(API + 'conta/obterContas?tipo=cr&pagas=false')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('RecPagar', res.data)
        localforage.setItem('RecPagar', res.data)
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
    },
    listarRecPagas(){
      let load = localStorage.getItem('loadContas')
      if(load === 'true') return
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Obtendo Receitas pagas...'
      })
      axios.get(API + 'conta/obterContas?tipo=cr&pagas=true')
      .then((res)=>{
        this.syncCount++
        console.log('syncCount', this.syncCount);
        console.log('RecPagas', res.data)
        localforage.setItem('RecPagas', res.data)
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
    },
    syncStart(e, done){
      let ws = localStorage.getItem('wsAtual')
      if(ws === '') return
      this.listarPessoas()
      this.listarCidadesCadastradas()
      this.listarBairros()
      this.todosProdutos()
      this.listarFamProdutos()
      this.listarCategorias()
      this.listarMarcas()
      this.listarDespPagar()
      this.listarDespPagas()
      this.listarRecPagar()
      this.listarRecPagas()
      this.listarUsuarios()
      this.interval = setInterval(() => {
        if (this.syncCount >= 12) {
          clearInterval(this.interval)
          this.syncCount = 0
          //console.log('interval', this.interval);
          done()
        }
      }, 1000)
      
    },
     
    //Armazenamento interno
    getLocalStorage(){
        let total = 0;
        for(let x in localStorage) {
            if(x !== 'length'){
                var quantidade = (localStorage[x].length * 2) / 1024;
                total += quantidade ;
                //console.log( x + " = " + quantidade .toFixed(2) + " KB");
            }
        }
        console.log( "Total armazenado no localStorage: " + total.toFixed(2) + " KB");
        
        if(total>1000){
            let mb = total / 1024
            this.localStorage = 'Em uso: ' + mb.toFixed(2).toString() + "MB de 4MB"
        }
        else{
            this.localStorage = 'Em uso: ' + total.toFixed(2).toString() + "KB de 4MB"
        }
        
    },
    getDBLocal(){
        navigator.webkitTemporaryStorage.queryUsageAndQuota ((usedBytes, grantedBytes) => {
            let uso = (usedBytes /1000000).toFixed(2)
            let total = (grantedBytes /1000000000).toFixed(2)
            this.dbLocal = 'Em uso: ' + uso.toString() + 'MB de ' + total.toString() + 'GB'
            console.log('db using: ', (usedBytes) /1000000, 'MB of ', grantedBytes /1000000000, 'GB');
        }, 
        function(e) { 
            console.error('Error', e);
        });    
    },
    
    //Resetar TODAS Configurações
    resetarTudo(){
        Dialog.create({
          title: 'Você tem certeza que deseja voltar TODAS as configurações para as iniciais do sistema?',
          message: 'Depois de confirmado, esta ação irá excluir todas as configurações e NÃO poderá ser revertida...',
          buttons: [
            {
              label: 'Não',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create.warning('NÃO RESETADO: As configurações do aplicativo continuam as mesmas')
              }
            },
            {
              label: 'Sim',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                localStorage.clear()
                this.$router.push('login')
                Toast.create.negative('Todas as configurações foram deletadas')
              }
            }
          ]
        })
        
    }
    
  },
  mounted(){
    this.getLocalStorage()
    this.getDBLocal()
  },
  created (){
    this.listarBancos()
    if(this.$route.query.configFoto === 'true'){
        this.configFoto = true
    }
    if(this.$route.query.bdConfig === true){
        this.bdConfig = true
        this.configFoto = true
        Dialog.create({
          title: 'Bem-vindo às Configurações',
          message: 'Você foi redirecionado para esta tela. Configure um banco de dados com as informações necessárias para a sua conexão.',
          buttons: [
            {
              label: 'Ok',
              color: 'info',
              raised: true
            }
          ]
        })
    }
    Notification.requestPermission()
  },
  beforeRouteLeave(to, from, next){
    this.setWS()
    next()
  },
  
}
</script>

<style scoped>
  #config{
    overflow: scroll;
  }
  .low{
    margin-bottom: 50px;
  }
  #btn-save{
    margin: 20px 0 0 40px;
  }
  img.avatar{
    width: 200px;
    height: 200px;
    margin: 10px;
  }
  .fileUpload {
    position: relative;
    overflow: hidden;
    margin: 10px;
  }
  span{
    background-color: #027BE3;
    color: #fff;
    font-weight: bold;
    border: 5px;
    padding: 20px;
  }
  .fileUpload input.upload {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
  }
</style>
