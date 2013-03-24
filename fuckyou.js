/**
 * Copyright 2013 Kevin Sweeney
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ---------------------------------------------------------------------------
 *
 * FUCK YOU!
 *
 * A JavaScript plugin to annoy off anyone using your site, regardless of
 * ability or disability.
 *
 * Edit the properties below, then drop this file anywhere on your page.
 * The audio pest is the only one enabled by default.
 *
 * Pro Tip: Include this file within an IE conditional tag! The recommended
 * conditional is:
 *
 * <!--[if lte IE 9]>
 *     <script src="fuckyou.js"></script>
 * <![endif]-->
 */

var FuckYou = (function() {

    'use strict';

// Constants _________________________________________________________________

    var ONE_SECOND = 1000,
        ONE_MINUTE = 60 * ONE_SECOND;

// Audio Pest ________________________________________________________________

    /**
     * Plays a high-pitched noise at random intervals.
     */
    function AudioPest(mp3_src, ogg_src) {
        var self = this,
            audio_12kHz_base64_mp3 = 'data:audio/mp3;base64,SUQzAwAAAAAxA1RQRTEAAAA3AAAB5GAHIAZQBlAE0AbwBzAHEAdQBpAHQAbwBSAGkAbgBnAHQAbwBuAGUAcwAuAG8AcgBnAAAAVEFMQgAAAD0AAAH//lQAZQBlAG4AIABCAHUAegB6ACAAbQBvAHMAcQB1AGkAdABvACAAcgBpAG4AZwB0AG8AbgBlAHMAAABUSVQyAAAALQAAAf/+MQAyADAAMAAwACAARgByAGUAcQB1AGUAbgBjAHkAIABUAG8AbgBlAAAAUFJJVgAAD7oAAFhNUAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBETT0iaHR0cDovL25zLmFkb2JlLmNvbS94bXAvMS4wL0R5bmFtaWNNZWRpYS8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIHhtcERNOmFydGlzdD0iRnJlZU1vc3F1aXRvUmluZ3RvbmVzLm9yZyIKICAgeG1wRE06YWxidW09IlRlZW4gQnV6eiBtb3NxdWl0byByaW5ndG9uZXMiCiAgIGRjOmZvcm1hdD0iYXVkaW8vbXBlZyIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxMy0wMi0yNFQxNjo0MDoyNS0wNTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMTMtMDItMjRUMTY6NDA6MjUtMDU6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjg3RjExNzQwNzIwNjgxMTgyMkFDNjcwMjRGRjk2Q0YiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjc3RjExNzQwNzIwNjgxMTgyMkFDNjcwMjRGRjk2Q0YiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExODIyQUM2NzAyNEZGOTZDRiI+CiAgIDx4bXBETTpUcmFja3M+CiAgICA8cmRmOkJhZz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iQ3VlUG9pbnQgTWFya2VycyIKICAgICAgeG1wRE06dHJhY2tUeXBlPSJDdWUiCiAgICAgIHhtcERNOmZyYW1lUmF0ZT0iZjQ0MTAwIi8+CiAgICAgPHJkZjpsaQogICAgICB4bXBETTp0cmFja05hbWU9IlN1YmNsaXAgTWFya2VycyIKICAgICAgeG1wRE06dHJhY2tUeXBlPSJJbk91dCIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDQxMDAiLz4KICAgIDwvcmRmOkJhZz4KICAgPC94bXBETTpUcmFja3M+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+MTIwMDAgRnJlcXVlbmN5IFRvbmU8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzp0aXRsZT4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Rjc3RjExNzQwNzIwNjgxMTgyMkFDNjcwMjRGRjk2Q0YiCiAgICAgIHN0RXZ0OndoZW49IjIwMTMtMDItMjRUMTY6NDA6MjUtMDU6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIEF1ZGl0aW9uIENTNiAoTWFjaW50b3NoKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOkY4N0YxMTc0MDcyMDY4MTE4MjJBQzY3MDI0RkY5NkNGIgogICAgICBzdEV2dDp3aGVuPSIyMDEzLTAyLTI0VDE2OjQwOjI1LTA1OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBdWRpdGlvbiBDUzYgKE1hY2ludG9zaCkiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uwwAAAHNWjN/TMAAPoOim3H8ACvrqIdTQSSSm5ADhWDMCggAQEgSDAzP/osWUpTPP/ww/X59////1nn////rPP////Wef///+s8/1z//DPP9c/PuFPb7hh+fcKen7hhvPOo/8v7hhunt1H/h/tTCvK5+YcuH8qSxXhuXyhnbv2qSxK3bh+IKnZfTRiy+6w7T3gLJo5wYxBsoFObXmsLOjKs1nLXtu3BEwuQp4GjO1jkhLhkax40nInQ9ZZQvhCIbi8cYYyySpiLoopXPzDWHcoWGNcvU9uUOxDl1yHcvV+yh/Icuv5DlQIFDkQHAQqBAo6IDgYqBDiB3DDwdDodBgLBXKBXKyJRBSkWK8i/xiG0URfvyHiwMZRfuYv9wpX/yyxPx6JV//4xYl8YrVs63//0kvjFJL8v1l3X//xikjcMTEb1l3WXf///4YmIbhiSQ2+msu6rd1zv///JH3fSCnjdB4m7twrd1W7qt3//+f//6IRCARQABcDFUGigMMAh4YFpgYfGEYMeOmGXfrd+taiQNURmJN/////d8w6KDxofMXD0xYMQCHBACTBANC4GRtAABQFLlLko9M5RVUyCgIrVY9+Nb8a37ra2RAf/////////pYzTWZbTWZbTXpbavUtq9ZtWLNqxZv2LN+wxVirFWKsULQEsQAAKeQAAEQAADgj//////////////+rr/////6yiGjhkUGwaQAWWBgeCGBhOFSBrCPcBpnHgBhvCQBgvAEGNQbkh6xEiKmv////////////////////////////////////////////////////////////////////+7DAOQAppU02fAsAAM6ppswAWbD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AABwB////////+vq/////9AgQyY0BpCEQJgPAwBBqAxpvcAxbBkAwCgPC1wQHFyEEJ80cAL///////////////nBIBSIjoPhCw0DAOAQDBkEEDPapMDNgDsDBeAACQCRGw7CgUUv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sMCnAD/pSzggAs2BdamnDABZsP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AADgj////////9X/////+ZizRcAuMbIloCwDgMC4cQMpkFQMkYawMCwEAbXDVgoMc8iBu3//////////////////////////////////////////////////////gAv//////////////+YiexWwhUNXA3EBgEAaBgrCsBm+Z8BmHCgBgmAOAwAITiS50vC/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwwKcAP/FJOCACzYl0qacMAFmw////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AADgj////////9fX/////5gJ6Fzi5CJi0AEgJAwQBgAzKugAyxBcAwRgNAKAAGWxKA5hPmj////////////////////////////////////////////////////+AC///////////////5kK4LJELBq0G+gYAwIAYIg0gZgXlgZUAxgYHwGA21EpE6ZF02b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7DApwA/6U04IALNgXWppzwA2bD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAACAAAAAOCC///////////////6v/////86IxFaCzyKDNgAACAwVhNAznMLAzKhJAwVAGAUAOG2CUxzyKG7f//////////////////////////////////////4AAA4A/////////T6//////RHLFxCyRKQN1gCAHgYEQyAZCHXAY5wvAYDAGhb8LNKR42NX//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sMCnAD/pTTZgAs2BdilnDABZsP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AADgj////////9Hq/////8sCRCviuD+MAA4A4GDAGQGflKAGboGAAQYwGgGBjMSgOYRcw///////////////////////////////////////////////////////wAADgj////////9X/////+kOYLCJ2DVINugGgWAwFCBAxpx/AxbB5AwCgUBvKJ6I8rlU2b//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwwKcAP+lNOGACzYF3KacEAFmw////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wC///////////////5ZERFoF+M8J+BEAgDBqBUDQkXEDOmBUBgNAFgHhvgncgZMGav///////////////////////////////////////////////////////////wAAOCP////////19X/////okTFuFhEEgsaAcBkA0QgGF6UwGE8PgCwFwtsKeOQThbPP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7DApwA/7U04YALNgXYpp7QAWbL////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////gAACAAAACAj////////9XX/////5YEUF2KcKRDlQUAcCgcANDoQARO0BwawWAgHPFKEAKZxf////////////////////////////////////////////////////+AAA4A/////////V//////uVSEG0LhDkQagMCEMIGBhyYGBMLYJAKDriuEDJ8qH2////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sMCnAD/pTThgAs2BdamnDABZsP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AADgj////////9f/////+WRExahPIhMFzQCgEQMG4DgNDBGAM64CgLBpBwDhDBcZDygdV///////////////////////////////////////////////////////gAADgD////////9uv/////0CLDTGwMkHRBCA8AgNwGJV/gGIANAAoEQwII7GUIoVzz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////G0k23JLbsyRM1USgyDvIWxGgsH4hCnIWph6E0SssZ7kLUw9CaJWWM7AwDSDUG0K+McmAYB+hqy0DjGOTAMA/Qj5tiSAtxFAEwvoBuRYE4EEHOAYE9ANyLAnAggi4CeaQBuNcCcA+KHlo2VFnFeF7EBih5aNlRZRVhbsumSgCYFgKoEYDAUTAABQJBQJjABGBgDIPGBAGEQCAEDQMC4wAhgcBCPJgaBpMCBgCB4CB8//uwwKcAE+VNNmACzYb3wid09/W5YAYwQApE0wNBMmA8wCAwBBWIgKMFAOL+mCILjwLmAgLGCgBCMBzBwEC4JbNb5ewvgouWjcYCgCnGFAACAASXMBQBWMYAAMgYFAGAwIEIBmBoEpFGBQICwIGAIJmC4DpSmAoBqDGAgGCwEGAIGmC4HlQFjCwIgEERhoMxj8EhreppwEKBhKIJiGGpgaARhADg8F5gECACBwhAEwHANdQAABOBHsvQwsvG4yJi/Fb1dwQoPDywjeNLZfBjEJC1iBHTceSNcnXDgeA3fmnInXbi8QfiafyzK5+YllWN3pXP1JZjK79JP1KTGnv0ljOkxp79Sxun7T9qWN0/amGFjdP2phnbxr9AI8BIRHiAyOkIj7ZHJJJJJJECbomp4k+MpfJyrDmcS/GUvk5ZC3JYvqFJEnLIW5HH6dK6NFkLcjjdMleLk5nMjjdMleJ0tltOFElxXBOlWSk4TeIUuB6lWSk8TeJcmRNWcgpwm8y6DV2w4sNArKmXQau2KMOe5gLjQSu2KLmbZpLLXwZzFFzNs0ldMELuhbAmnMhU1ehMZ71MVqsxTBeBIp50vVqrBIAm6IBpGyl1XSYlBagMXWFbVpS6nrUFdxE5tVKkwm7oBW0QTLOLysuelMV5ETlnKYqCpOGGHgQcbdQYCCVtjVqgMDMQDS5TRRxZ8mE+6pXtZUy54ljQ2u2DmVONALEZWzmTO0/Udd2YcqifaLTMO1IavwzPTMZwjV+Uztalwpr9Wzqmzrdq2dU3auONnWXcccrUJKDFRYLCiomDhQ2NiwVFCoWKIocKhY//////////////+7DApwA/5dU5p79NyXYAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFRBRzEyMDAwIEZyZXF1ZW5jeSBUb25lAAAAAAAAAAAAAEZyZWVNb3NxdWl0b1Jpbmd0b25lcy5vcmcAAAAAAFRlZW4gQnV6eiBtb3NxdWl0byByaW5ndG9uZXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            audio_12kHz_base64_ogg = 'data:audio/ogg;base64,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U0otdhBSCqWkFEppKbUUW0otxooxCJlzUjLnpIRSWgqlpJY5J6WDkFIHoZSSUmulpNYy56R00EnpIJRSUmmplNRaKCW1klJrJZXWWmsxptZiDKWkFEppraTUYmopttZarBVjEDLnpGTOSQmlpBRKSS1zTkoHIZXOQSklldZKSallzknpIJTSQSilpNJaSaW1UEpLJaXWQimttdZiTKm1GkpJraTUWkmptdRara21GDsIKYVSWgqltJZaijGlFmMopbWSUmslpdZaa7W21mIMpbRUUmmtpNRaaq3G1lqsqaUYU2sxttZqjTHGHGPNOaUUY2opxtRajC22HGOsNXcQUgqlpBZKSS21FGNqLcZQSmolldZKSS221mpMrcUaSmmtpNRaSam11lqNrbUaU0oxptZqTKnFGGPMtbUYc2otxtZarKm1GGOsNccYay0AAGDAAQAgwIQyUGjISgAgCgAAMQYhxpwzCCnFGITGIKUYgxApxZhzECKlGHMOQsaYcxBKyRhzDkIpHYQSSkmpgxBKKSkVAABQ4AAAEGCDpsTiAIWGrAQAQgIAGISUYsw55yCUklKEkFKMOecchFJSihBSijHnnINQSkqVUkwx5hyEUlJqqVJKMcacg1BKSqlljDHmHIQQSkmptYwxxpyDEEIpKbXWOeccdBJKSaWl2DrnnIMQSiklpdZa5xyEEEpJpaXWYuucgxBCKSWl1FqLIYRSSkklpZZiizGEUkopJaWUWosxllRSSqml1mKLscZSSkoppdZaizHGmlJqqbXWYoyxxlpTSqm11lqLMcZaawEAAAcOAAABRtBJRpVF2GjChQeg0JAVAUAUAABgDGIMMYaccxAyCJFzDEIHIXLOSemkZFJCaSGlTEpIJaQWOeekdFIyKaGlUFImJaRUWikAAOzAAQDswEIoNGQlAJAHAAAhpBRjjDGGlFKKMcYcQ0opxRhjjCmlGGOMMeeUUowxxphzjDHGHHPOOcYYY8w55xxjzDHnnHOOMcacc845xxxzzjnnnGPOOeecc84JAAAqcAAACLBRZHOCkaBCQ1YCAKkAAIQxSjHmHIRSGoUYc845CKU0SDHmnHMQSqkYc845CKWUUjHmnHMQSiklc845CCGUklLmnHMQQiglpc45CCGEUkpKnXMQQiihlJRCCKWUUlJKqYUQSimllFRaKqWUklJKqbVWSiklpZRaaq0AAPAEBwCgAhtWRzgpGgssNGQlAJABAMAYg5BBBiFjEEIIIYQQQggJAAAYcAAACDChDBQashIASAUAAAxSijEHpaQUKcWYcxBKSSlSijHnIJSSUsWYcxBKSam1ijHnIJSSUmudcxBKSam1GDvnIJSSUmsxhhBKSam1GGMMIZSSUmsx1lpKSam1GGvMtZSSUmsx1lprSq21GGutNeeUWmsx1lpzzgUAIDQ4AIAd2LA6wknRWGChISsBgDwAAEgpxhhjjDGlFGOMMcaYUooxxhhjjDHGGGOMMaYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHmGGOMMcYYY8w5xhhjjDnmHGOMMcacc04AAFCBAwBAgI0imxOMBBUashIACAcAAIxhzDnnIJSQSqOUcxBCKCWVVhqlnIMSQikptZY5JyWlUlJqLbbMOSkplZJSay12ElJqLaXWYqyxg5BSa6m1FmONHYRSWootxhpz7SCUklprMcZaayilpdhirLHWmkMpqbUWY60151xSai3GWmvNteeSUmsxxlprrbmn1mKssdZcc+89tRZjjbXmnHvOBQCYPDgAQCXYOMNK0lnhaHChISsBgNwAAEYpxpxzDkIIIYQQQgiVUow55xyEEEIIIYQQKqUYc845CCGEEEIIIWSMOeccdBBCCCGEEELIGHPOOQghhBBCCCGE0DnnHIQQQgghhFBCKaVzzjkHIYQQQgghhFBK5xyEEEIIIYQSSiillM45CCGEEEIIpYRSSikhhBBCCCGEEkoppZRSOgghhBBCCKWUUkoppYQQQgghhBBKKaWUUkoJIYQQQgghlFJKKaWUEkIIIYQSSimllFJKKSWEEEIIoZRSSimllFJKCCGEUkoppZRSSimllBBCKCGUUkoppZRSSikhhBJKKKWUUkoppZRSQggllFJKKaWUUkoppYQQQiillFJKKaWUUkoJIZRSSimllFJKKaWUUgAA0IEDAECAEZUWYqcZVx6BIwoZJqBCQ1YCAOEAAAAhlFJKKaWUUmokpZRSSimllFIjJaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSqWUUkoppZRSSimllFJKKaWU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',
            supports_mp3_audio = true;

        self.audio_src = supports_mp3_audio ? (mp3_src || audio_12kHz_base64_mp3) : (ogg_src || audio_12kHz_base64_ogg);
        self.audio_delay_range = {
            min: ONE_MINUTE,
            max: 3 * ONE_MINUTE
        };

        self.pester();
    }

    AudioPest.prototype.getDelay = function() {
        var self = this,
            range = self.audio_delay_range,
            random_delay;

        random_delay = range.min + (Math.random() * range.max);

        return random_delay;
    };

    AudioPest.prototype.createAudioElement = function() {
        var self = this,
            audio_element = new Audio();

        audio_element.src = self.audio_src;
        audio_element.autoplay = false;
        audio_element.loop = false;
        audio_element.id = 'audio_pest';

        return audio_element;
    };

    AudioPest.prototype.play = function() {
        var self = this;

        if (!self.element) {
            self.element = self.createAudioElement();
        }

        self.element.play();
    };

    AudioPest.prototype.pester = function() {
        var self = this;

        self.timer = setTimeout(function() {
            self.play();
            self.pester();
        }, self.getDelay());
    };

    AudioPest.prototype.destroy = function() {
        var self = this,
            element,
            parent;

        if (!self.element) {
            return;
        }

        clearTimeout(self.timer);
        self.element.stop();

        element = document.getElementById('audio_pest');
        parent = element.getParentNode();

        if (parent) {
            parent.removeNode(element);
        }
    };

// Initialization ____________________________________________________________

    var pests = [];
    function initialize(options) {
        if (options.audio_pest === true) {
            pests.push(new AudioPest());
        }
    }

// Exposed Methods ___________________________________________________________

    function getPests() {
        return pests;
    }

    return {
        initialize: initialize,
        getPests: getPests
    };

})();

// Kick-Off __________________________________________________________________

/**
 * If your DOM honestly takes longer than eight seconds to load, then move
 * this into a proper DOM-ready wrapper. Even so, this will cause an error to
 * be thrown and break your site anyway--mission accomplished!
 */
setTimeout(FuckYou.initialize, 8000, [{
    audio_pest: true
}]);