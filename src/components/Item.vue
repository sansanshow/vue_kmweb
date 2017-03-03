<template>
    <div class="weui_cell">
        <div class="weui_cell_hd">
            <img v-bind:src="item.url" alt="" class="cover">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
            <h3 class="title">{{item.appName}}</h3>
            <p class="summary"><label>{{item.start}}~{{item.end}}</label>&nbsp;&nbsp;&nbsp;<label>{{item.time}}</label></p>
        </div>
        <div class="weui_cell_ft">
        </div>
    </div>
</template>