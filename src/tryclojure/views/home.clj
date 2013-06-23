(ns tryclojure.views.home
  (:require [noir.core :refer [defpartial defpage]]
            [hiccup.element :refer [javascript-tag link-to unordered-list]]
            [hiccup.page :refer [include-css include-js html5]]
            [tryclojure.views.template :refer [root-html]]))

(defpartial main-html []
  [:div
    [:div.row-fluid
      [:div.container.span6
        [:div.code_container.main_block
          [:textarea.code {:data-result "#result"}
"; This is Clojure code, edit and see what happens.
(let
  [name \"Anonymous\"]
  (format \"Hello world! By %s.\" name))"]]
      ]
      [:div.result_container.container.span6
        [:pre 
          "=> "
          [:span#result]
        ]]]
])

(defpage "/" []
  (root-html main-html))

