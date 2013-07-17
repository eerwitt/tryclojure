(ns tryclojure.views.home
  (:require [noir.core :refer [defpartial defpage]]
            [hiccup.element :refer [javascript-tag link-to unordered-list]]
            [hiccup.page :refer [include-css include-js html5]]
            [tryclojure.views.template :refer [root-html]]))

(defpartial main-html []
  [:div.row-fluid
    [:div.container.span6
      [:div.code_container.main_block
        [:textarea#block.code {:data-result "#result"}
"; This is Clojure code, edit and see what happens.
(let [name \"Anonymous\"]
  (format \"Hello world! By %s.\" name))"]]
    ]
    [:div.result_container.container.span6
      [:pre "=> " [:span#result]]
      [:p "Try the " [:a {:href "/tutorial" :title "Tutorials"} "tutorials"] " to gain experience using Clojure."]]]
  [:div.row-fluid
    [:div.span6
      [:div.btn-group.pull-right
        [:a.btn.btn-success {:href "#" :data-code-block "#block"}
          [:i.icon-play.icon-white] " Run"]
        [:a.btn.btn-success.dropdown-toggle
          {:data-toggle "dropdown" :href "#"}
          [:span.caret]]
        [:ul.dropdown-menu
          [:li [:a {:href "#" :data-code-block "#block" :data-autorun "true"} [:i.icon-refresh] " Autorun"]]]
        ]
    ]])

(defpage "/" []
  (root-html main-html "/resources/public/javascript/main.js"))
