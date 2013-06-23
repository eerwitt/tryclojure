(ns tryclojure.views.tutorial
  (:require [noir.core :refer [defpartial defpage]]
            [hiccup.element :refer [javascript-tag link-to unordered-list]]
            [hiccup.page :refer [include-css include-js html5]]
            [tryclojure.views.template :refer [root-html]]))

(defpartial tutorial-html []
  [:div
    [:div.row-fluid
      [:div.span6
        [:div.code_container
          [:textarea.code {:data-result "#result" :data-expected "3"}
"(let
  [x 123]
  (+ x 24))"]]]
      [:div.span6.result_container
        [:pre#result]]]
])

(defpage "/tutorial" []
  (root-html tutorial-html))
